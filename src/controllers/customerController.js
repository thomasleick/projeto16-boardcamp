const {
  createCustomer,
  findCustomers,
  findCustomerById,
  findCustomerByCpf,
  editCustomer,
} = require("../services/customerService");

const postCustomer = async (req, res) => {
  try {
    const foundCustomer = await findCustomerByCpf(req.body.cpf);
    if (foundCustomer) {
      return res
        .status(409)
        .json({ message: "Customer already registered with this CPF" });
    }
    const customer = await createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getCustomers = async (req, res) => {
  try {
    const customers = await findCustomers();
    res.status(201).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getCustomerById = async (req, res) => {
  try {
    const customer = await findCustomerById(req.params.id);
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const putCustomer = async (req, res) => {
  try {
    const foundCustomerId = await findCustomerById(req.params.id);
    if (!foundCustomerId) {
      return res
        .status(404)
        .json({ message: "Customer not found" });
    }
    const foundCustomerCpf = await findCustomerByCpf(req.body.cpf);
    if (foundCustomerCpf && foundCustomerCpf.id !== parseInt(req.params.id)) {
        return res
          .status(409)
          .json({ message: "Customer already registered with this CPF" });
      }

    const customer = await editCustomer(foundCustomerId.id, req.body);
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postCustomer,
  getCustomers,
  getCustomerById,
  putCustomer,
};
