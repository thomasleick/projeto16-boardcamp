const {
  createRental,
  findRentals,
  findRentalById,
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

    const rent = await createRental(req.body);
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
const getRentalById = async (req, res) => {};
const putRental = async (req, res) => {};
const deleteRental = async (req, res) => {};

module.exports = {
  postRental,
  getRentals,
  getRentalById,
  putRental,
  deleteRental,
};
