import connectDb from "../../../middleware/dbMiddleware";
import moment from "moment";
const jwt = require("jsonwebtoken");
const sendMail = require("../../../middleware/sendMail");
const generator = require("generate-password");
const nextConnect = require("next-connect");
const Users = require("../../../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email: ", email);

    const user = await Users.findOne({ email }).exec();

    if (user) {
      // random new password
      const newPassword = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
      });
      const token = await jwt.sign({email: email}, "Uxdlab@123");
      console.log("tooooooooken", token)

      // send mail verify
      const html = `
      <!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
    
      <body>
    
      <span class="mcnPreviewText" style="
            display: none;
            font-size: 0px;
            line-height: 0px;
            max-height: 0px;
            max-width: 0px;
            opacity: 0;
            overflow: hidden;
            visibility: hidden;
            mso-hide: all;
          "></span <center>
      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
        <tr>
          <td align="center" valign="top" id="bodyCell">
    
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
              <tr>
                <td valign="top" id="templatePreheader">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
                    style="min-width: 100%">
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px">
    
                          <table align="left" border="0" cellpadding="0" cellspacing="0"
                            style="max-width: 100%; min-width: 100%" width="100%" class="mcnTextContentContainer">
                            <tbody>
                              <tr>
                                <td valign="top" class="mcnTextContent" style="
                                        padding: 0px 18px 9px;
                                        text-align: center;
                                      ">
                                  <a href="*|ARCHIVE|*" target="_blank">View this email in your browser</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td valign="top" id="templateHeader">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock"
                    style="min-width: 100%">
                    <tbody class="mcnImageBlockOuter">
                      <tr>
                        <td valign="top" style="padding: 9px" class="mcnImageBlockInner">
                          <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0"
                            class="mcnImageContentContainer" style="min-width: 100%">
                            <tbody>
                              <tr>
                                <td class="mcnImageContent" valign="top" style="
                                        padding-right: 9px;
                                        padding-left: 9px;
                                        padding-top: 0;
                                        padding-bottom: 0;
                                        text-align: center;
                                      ">
                                  <Image width={0} height={0} align="center" alt="" src="*|BRAND:LOGO|*" width="196" style="
                                          max-width: 196px;
                                          padding-bottom: 0;
                                          display: inline !important;
                                          vertical-align: bottom;
                                        " class="mcnImage" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td valign="top" id="templateBody">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
                    style="min-width: 100%">
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px">
                          
                        <p>Please use this link to create a new personal password.</p>
                        <a href="http://rebuildingiraq.net/reset-password/${token}">Click Here</a>

                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <table
                align="left"
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="max-width: 100%; min-width: 100%"
                width="100%"
                class="mcnTextContentContainer"
              >
                <tbody>
                  <tr>
                    <td
                      valign="top"
                      class="mcnTextContent"
                      style="
                        padding-top: 0;
                        padding-right: 18px;
                        padding-bottom: 9px;
                        padding-left: 18px;
                      "
                    >
                      

                    </td>
                  </tr>
                </tbody>
              </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"
                    style="min-width: 100%">
                    <tbody class="mcnDividerBlockOuter">
                      <tr>
                        <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 10px 18px 25px">
                          <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="
                                  min-width: 100%;
                                  border-top: 2px solid #eeeeee;
                                ">
                            <tbody>
                              <tr>
                                <td>
                                  <span></span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
                    style="min-width: 100%">
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px">
    
                          <table align="left" border="0" cellpadding="0" cellspacing="0"
                            style="max-width: 100%; min-width: 100%" width="100%" class="mcnTextContentContainer">
                            <tbody>
                              <tr>
                                <td valign="top" class="mcnTextContent" style="
                                        padding-top: 0;
                                        padding-right: 18px;
                                        padding-bottom: 9px;
                                        padding-left: 18px;
                                        text-align: center
                                      ">
                                  <em>Copyright © * ${moment().format('YYYY')} <a href="https://www.ziyen.com/" target="_blank">Ziyen Inc.</a>, All rights reserved.</em>
                                  <br />
                                  <br />
                                  <br />
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
    
          </td>
        </tr>
      </table>
      </center>
    </body>
    
    </html>
      `;

      const text = "";
      const mailsTo = [
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          type: "to",
        },
      ];

      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          res.status(400).json(err);
        }
        bcrypt.hash(newPassword, salt, async (err, hash) => {
          if (err) {
            res.status(400).json(err);
          }
          console.log("hash: ", hash);
          const updateUser = await Users.findOneAndUpdate(
            { _id: user.id },
            { $set: { password: hash } },
            async (err, result) => {
              if (err) {
                res.status(400).json(err);
              }
              console.log(result);

              const sendmail = await sendMail({
                emails: mailsTo,
                html,
                text,
                subject: "Password Reset",
              });

              res.status(200).json({
                status: "success",
                message: "Please check your email.",
              });
            }
          );
        });
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Email does not exist.",
      });
    }
  } catch (error) {
    console.log("err: ", error);
    res.status(400).json(error);
  }
});

export default connectDb(handler);
