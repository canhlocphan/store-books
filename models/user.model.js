const User = require("../databases/user");

//function
async function checkEmailExists(email) {
  const isExists = await User.exists({ email: email });
  return isExists;
}

//return 1 if vaild
async function checkPassword(email, password) {
  for (account of accounts) {
    if (account.email === email && account.password === password) {
      return 1;
    }
  }
  return 0;
}

// var hashPwd = function hashPwd(salt, pwd) {
//   var hmac = crypto.createHmac("sha256", salt);
//   return hmac.update(pwd).digest("hex");
// };

module.exports = {
  getActivedUserInfo: async (id) => {
    const usrData = await User.findOne({ _id: id, status: "Active" });
    return usrData;
  },
  getActivedUserByEmail: async (email) => {
    const usrData = await User.findOne({ email: email, status: "Active" });
    return usrData;
  },
  getAllUser: async () => {
    const allUser = await User.find({ show: true }).exec();
    console.log(allUser);
    return allUser;
  },

  addNewAccount: async (accountInfo) => {
    const newUser = { ...accountInfo };
    console.log("User info: ", newUser);

    if (await checkEmailExists(accountInfo.email)) {
      console.log("addNewAccount.", "Email has been used");
      return { status: false, message: "Email is already used" };
    }

    // // //send mail
    // const PORT = process.env.PORT || 3000
    // // const host = `http://localhost:${PORT}`;
    // // // console.log(host);
 
    // const message = {
    //   from: process.env.MAIL_USERNAME || "pcloc101099@gmail.com",
    //   to: userRes.email,
    //   subject: "BookStore - Verify your account",
    //   text: "Verify your BookStore account",
    // };
    // console.log("Message: ", message);

    // let transporter = nodemailer.createTransport({
    //   // service: "gmail",
    //   host: 'smtp.gmail.com',
    //   port: 587,
    //   auth: {
    //     user: process.env.MAIL_USERNAME || "pcloc101099@gmail.com",
    //     pass: process.env.MAIL_PASSWORD || "01676715510Loc"
    //   }
    // });
    // // send mail with defined transport object
    // try {
    //   let info = await transporter.sendMail(message);
    //   // console.log("Message sent: %s", info.messageId);
    // } catch (error) {
    //   console.log("Error send email: ", error)
    //   return { status: false, message: "Can not send email" }
    // }

    return { status: true, message: "Register successfully" };
  },

  register: async (user) => {
    console.log(user);
    const res = await User.create(user);
    return res;
  },

  login: async (usr, pwd) => {
    const isEmailExists = await checkEmailExists(usr);
    if (isEmailExists) {
      // const usrData = await User.findOne({ email: usr, show: true });
      // console.log("Login", "userData", usrData);
      // console.log("login", "salt", usrData.salt);
      // console.log("login", "pwd", pwd);
      // const pass = hashPwd(usrData.salt, pwd);
      // console.log("login", "pass", pass);
      // if (usrData.password === pass) {
      //   return 1;
      // } else {
      //   return 0;
      // }
    }
    return -1;
  },

  verifyEmail: async (email, id) => {
    const query = { _id: id, email: email, status: "Pending" };
    let result = false;

    try {
      await User.findOneAndUpdate(query, { status: "Active" });
      result = true;
    } catch (error) {
      console.log("Error: verify email failed, cannot update account status to \"Active\"");
    }
    return result;
  },

};
