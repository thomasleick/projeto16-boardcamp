const {
  createRent,
  findRents,
  findRentById,
} = require("../services/rentService");

const { findGameById } = require("../services/gameService");
const { findCustomerById } = require("../services/customerService");

const postRent = async (req, res) => {
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

    const rent = await createRent(req.body);
    res.status(201).json(rent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRents = async (req, res) => {};
const getRentById = async (req, res) => {};
const putRent = async (req, res) => {};
const deleteRent = async (req, res) => {};

module.exports = {
  postRent,
  getRents,
  getRentById,
  putRent,
  deleteRent,
};