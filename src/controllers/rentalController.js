const {
  createRental,
  findRentals,
  findRentalById,
  findRentalsByGameId,
  returnRentalWithId,
  deleteRentalWithId,
} = require("../services/rentalService");

const { findGameById } = require("../services/gameService");
const { findCustomerById } = require("../services/customerService");

const postRental = async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const game = await findGameById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const customerId = req.body.customerId;
    const customer = await findCustomerById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const rentalsOfGameId = await findRentalsByGameId(req.body.gameId);
    const rentalsOfGameIdNotReturned = rentalsOfGameId.filter(
      (rental) => rental.returnDate === null
    );
    const gamesNotReturned = rentalsOfGameIdNotReturned.length;
    if (game.stockTotal <= gamesNotReturned) {
      return res.status(400).json({ message: "Game not in stock" });
    }
    const rentalData = {
      ...req.body,
      rentDate: new Date(),
      originalPrice: req.body.daysRented * game.pricePerDay,
    };

    const rent = await createRental(rentalData);
    res.status(201).json(rent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRentals = async (req, res) => {
  try {
    const { customerId, gameId, order, offset, limit, desc, status, startDate } = req?.query;
    const rentals = await findRentals({
      customerId,
      gameId,
      order,
      offset,
      limit,
      desc,
      status,
      startDate,
    });
    const rentalsWithGameAndCustomer = await Promise.all(
      rentals.map(async (rental) => {
        const gameId = rental.gameId;
        const game = await findGameById(gameId);

        const customerId = rental.customerId;
        const customer = await findCustomerById(customerId);

        return {
          id: rental.id,
          customerId: rental.customerId,
          gameId: rental.gameId,
          rentDate: rental.rentDate,
          daysRented: rental.daysRented,
          returnDate: rental.returnDate,
          originalPrice: rental.originalPrice,
          delayFee: rental.delayFee,
          customer: { id: customer.id, name: customer.name },
          game: { id: game.id, name: game.name },
        };
      })
    );
    res.status(200).json(rentalsWithGameAndCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const returnRental = async (req, res) => {
  try {
    const rentalId = req.params.id;
    const rental = await findRentalById(rentalId);

    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }
    if (rental.returnDate) {
      return res.status(400).json({ message: "Rental already returned" });
    }

    const game = await findGameById(rental.gameId);

    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const date1Obj = rental.rentDate;
    const today = new Date();
    const diff = Math.abs(today.getTime() - date1Obj.getTime());
    const days = Math.round(diff / oneDay);
    const delayFee = Math.max((days - rental.daysRented) * game.pricePerDay, 0);

    await returnRentalWithId(rentalId, today, delayFee);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteRental = async (req, res) => {
  try {
    const rental = await findRentalById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }
    if (!rental.returnDate) {
      return res.status(400).json({ message: "Rental not returned" });
    }
    await deleteRentalWithId(req.params.id);
    res.status(200).json({ message: "Rental deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postRental,
  getRentals,
  returnRental,
  deleteRental,
};
