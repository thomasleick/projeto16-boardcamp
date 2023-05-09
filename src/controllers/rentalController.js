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

const getRentals = async (req, res) => {};
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