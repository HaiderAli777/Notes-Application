const express = require("express");
const mongoose = require("mongoose");
const User = require("./Models/UserModels");
const Notes = require("./Models/NotesModel");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const authentication = require("./Controller.js/Authentication");
const config = require("./config.json");
const app = express();
app.use(
  cors({
    origin: "*", // Allow requests from any origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
mongoose
  .connect(config.connection_string)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

app.use(express.json());

app.listen(9000);
app.get("/", authentication, (req, res) => {
  console.log(req.user);
  return res.status(202).json({
    error: false,
    message: "Hey U did A get Request",
    data: req.user,
  });
});
app.post("/Signup", async (req, res) => {
  console.log(req.body);
  const { Name, Email, Password } = req.body;

  if (!Name) {
    return res.status(404).json({
      error: true,
      message: "name is not found",
    });
  }
  if (!Email) {
    return res.status(404).json({
      error: true,
      message: "Email is not found",
    });
  }
  if (!Password) {
    return res.status(404).json({
      error: true,
      message: "Password is not found",
    });
  }
  const find = await User.findOne({ email: Email });
  if (find) {
    return res.status(404).json({
      message: "User Already Exist",
      error: true,
    });
  }

  const salt = await bcyrpt.genSalt(10);
  const hashed = await bcyrpt.hash(Password, salt);

  const user = new User({
    name: Name,
    password: hashed,
    email: Email,
    image: Name.trim()[0],
  });
  console.log(user);
  user
    .save()
    .then(() => {
      console.log("SAVE THE USER DOCUMENT");
      return res.status(202).json({
        message: "Docuement Saved",
        data: user,
        status: true,
        error: false,
      });
    })
    .catch(() => {
      console.log("Error");
      return res.status(404).json({
        message: "Docuement Not Saved",
        status: false,
      });
    });
});

app.post("/Login", async (req, res) => {
  const { Email, Password } = req.body;
  if (!Password) {
    return res.status(404).json({
      error: true,
      message: "Password is not found",
    });
  }
  if (!Email) {
    return res.status(404).json({
      error: true,
      message: "Email is not found",
    });
  }
  try {
    const findUser = await User.findOne({ email: Email });
    if (!findUser) {
      return res.status(404).json({
        error: true,
        message: "User is not found.Kindly SignUp",
      });
    }

    const Ismatch = await bcyrpt.compare(Password, findUser.password);
    if (!Ismatch) {
      return res.status(404).json({
        error: true,
        message: "Incorrect Password",
      });
    }
    const token = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );
    res.status(202).json({
      message: "U got loggin",
      userId: findUser._id,
      data: findUser,
      jwttoken: token,
    });
  } catch (err) {
    console.log("Internal Error");
  }
});

app.post("/createNotes", authentication, async (req, res) => {
  const { Title, Description } = req.body;
  if (!Title) {
    return res.status(400).json({
      message: "Title Is not Found",
      error: true,
    });
  }
  if (!Description) {
    return res.status(400).json({
      message: "Description Is not Found",
      error: true,
    });
  }

  try {
    const postNotes = new Notes({
      title: Title,
      description: Description,
      userId: req.user._id,
    });
    await postNotes.save();
    return res.status(200).json({
      message: "Saved Notes",
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error During Saving Notes",
      error: true,
    });
  }
});

app.get("/getNotes", authentication, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const lim = 6;
    const sk = (page - 1) * lim;
    const AllNot = await Notes.find({ userId: req.user._id });
    const len = AllNot.length;
    const AllNotes = await Notes.find({ userId: req.user._id })
      .sort({ pin: -1 })
      .select("-userId")
      .skip(sk)
      .limit(lim);

    return res.status(200).json({
      error: false,
      data: AllNotes,
      count: len,
      status: "success",
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      detail: err,
      status: "failed",
    });
  }
});
app.get("/getNotes/:id", authentication, async (req, res) => {
  try {
    const id = req.params.id;
    const idNotes = await Notes.findOne({ _id: id, userId: req.user._id });
    return res.status(200).json({
      error: false,
      data: idNotes,
      status: "success",
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed to extract through id",
    });
  }
});
app.delete("/deleteNotes/:id", authentication, async (req, res) => {
  const noteId = req.params.id;
  console.log("Heyy", noteId);
  console.log("userid", req.user._id);
  try {
    const findNote = await Notes.findById(noteId);
    console.log(findNote);
    if (findNote.userId == req.user._id) {
      console.log("inside");
      const deletedNote = await Notes.findByIdAndDelete(noteId);
      return res.status(200).json({
        error: false,
        data: deletedNote,
        message: "Notes Deleted",
      });
    } else {
      return res.status(400).json({
        status: "U are Deleting Others Notes",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "failed to delete",
      message: err,
    });
  }
});
app.put("/updateNotes/:id", authentication, async (req, res) => {
  const noteId = req.params.id;
  try {
    const { Name, Description } = req.body;
    console.log("fin", noteId);
    console.log("fin", req.user._id);
    if (!Name) {
      return res.status(400).json({
        message: "Name is not found",
      });
    }
    if (!Description) {
      return res.status(400).json({
        message: "Description is not found",
      });
    }
    const findNote = await Notes.findById(noteId);

    console.log(findNote);
    if (findNote.userId == req.user._id) {
      const updateNotes = await Notes.findByIdAndUpdate(noteId, {
        title: Name,
        description: Description,
      });
      return res.status(200).json({
        error: false,
        data: updateNotes,
        message: "Updated Notes",
      });
    } else {
      return res.status(400).json({
        status: "U are Updating others notes",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "failed to Update",
    });
  }
});

app.patch("/pinned/:id", authentication, async (req, res) => {
  const noteId = req.params.id;

  try {
    console.log("fin", noteId);
    console.log("fin", req.user._id);

    const findNote = await Notes.findById(noteId);
    console.log("pin", findNote.pin);
    console.log(findNote);
    if (findNote.userId == req.user._id) {
      const updateNotes = await Notes.findByIdAndUpdate(noteId, {
        pin: !findNote.pin,
      });
      return res.status(200).json({
        error: false,
        data: updateNotes,
        message: "pinned",
      });
    } else {
      return res.status(400).json({
        status: "U are pinning others notes",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "failed to Pin",
      err: err,
    });
  }
});
