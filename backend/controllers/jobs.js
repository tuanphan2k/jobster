import { StatusCodes } from "http-status-codes";

import Job from "../models/Job.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getAllJobs = async (req, res) => {
  res.send("Get all jobs");
};

const getJob = async (req, res) => {
  res.send("Get Job");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user._id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  res.send("Update job");
};

const deleteJob = async (req, res) => {
  res.send("Update job");
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
