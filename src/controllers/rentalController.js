const {
  createRental,
  findRentals,
  findRentalsByGameId,
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

    const rentalsOfGameId = await findRentalsByGameId(req.body.gameId)
    const rentalsOfGameIdNotReturned = rentalsOfGameId.filter(rental => rental.returnDate === null)
    const gamesNotReturned = rentalsOfGameIdNotReturned.length
    if (game.stockTotal <= gamesNotReturned) {
      return res.status(400).json({ message: "Game not in stock" })
    }
    const rentalData = {
      ...req.body,
      rentDate: new Date(),
      originalPrice: req.body.daysRented * game.pricePerDay,
    }
    
    const rent = await createRental(rentalData);
    res.status(201).json(rent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRentals = async (req, res) => {
  try {
    const rentals = await findRentals();
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
          customer,
          game,
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
    console.log(rental)
    if (rental.returnDate) {
      return res.status(400).json({ message: "Rental already returned" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const putRental = async (req, res) => {};
const deleteRental = async (req, res) => {};

module.exports = {
  postRental,
  getRentals,
  returnRental,
  putRental,
  deleteRental,
};
