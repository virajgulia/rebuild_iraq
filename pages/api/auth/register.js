import connectDb from "../../../middleware/dbMiddleware";
import Stripe from "stripe";
import moment from "moment";
const stripe = new Stripe(process.env.STRIPE_SECRET);
const sendMail = require("../../../middleware/sendMail");

const nextConnect = require("next-connect");
const Users = require("../../../models/user");
const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      planId,
      planName,
      // customerId,
      paymentMethodId,
      tenderCategories,
    } = req.body;
    let user = new Users({
      email,
      tenderCategories,
      password,
      firstName,
      lastName,
      plan: planId,
      started: moment().local().unix(),
      renew: moment().local().add(2, "days").unix(),
      // customerId,
      paymentMethodId,
      planName,
      startPlan: moment(new Date()),
      tempPass: false
    });
    console.log(user);

    if (planId !== "free") {
      // // create customer
      const customer = await stripe.customers.create({
        email,
        name: `${firstName} ${lastName}`,
        // balance: 50000,
        payment_method: paymentMethodId,
      });

      //subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: planId,
          },
        ],
        default_payment_method: paymentMethodId,
      });

      // update user
      user.customerId = customer.id;
      user.paid = true;
      user.subscriptionId = subscription.id;
      user.started = subscription.current_period_start;
      user.renew = subscription.current_period_end;
    }

    await user.save();

    // send mail verify
    // const html = `
    //   <!DOCTYPE html>
    //   <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    //   xmlns:o="urn:schemas-microsoft-com:office:office">
    
    //   <body>
    
    //   <span class="mcnPreviewText" style="
    //         display: none;
    //         font-size: 0px;
    //         line-height: 0px;
    //         max-height: 0px;
    //         max-width: 0px;
    //         opacity: 0;
    //         overflow: hidden;
    //         visibility: hidden;
    //         mso-hide: all;
    //       "></span <center>
    //   <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
    //     <tr>
    //       <td align="center" valign="top" id="bodyCell">
    
    //         <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
    //           <tr>
    //             <td valign="top" id="templatePreheader">
    //               <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
    //                 style="min-width: 100%">
    //                 <tbody class="mcnTextBlockOuter">
    //                   <tr>
    //                     <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px">
    
    //                       <table align="left" border="0" cellpadding="0" cellspacing="0"
    //                         style="max-width: 100%; min-width: 100%" width="100%" class="mcnTextContentContainer">
    //                         <tbody>
    //                           <tr>
    //                             <td valign="top" class="mcnTextContent" style="
    //                                     padding: 0px 18px 9px;
    //                                     text-align: center;
    //                                   ">
    //                               <a href="*|ARCHIVE|*" target="_blank">View this email in your browser</a>
    //                             </td>
    //                           </tr>
    //                         </tbody>
    //                       </table>
    
    //                     </td>
    //                   </tr>
    //                 </tbody>
    //               </table>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td valign="top" id="templateHeader">
    //               <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock"
    //                 style="min-width: 100%">
    //                 <tbody class="mcnImageBlockOuter">
    //                   <tr>
    //                     <td valign="top" style="padding: 9px" class="mcnImageBlockInner">
    //                       <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0"
    //                         class="mcnImageContentContainer" style="min-width: 100%">
    //                         <tbody>
    //                           <tr>
    //                             <td class="mcnImageContent" valign="top" style="
    //                                     padding-right: 9px;
    //                                     padding-left: 9px;
    //                                     padding-top: 0;
    //                                     padding-bottom: 0;
    //                                     text-align: center;
    //                                   ">
    //                               <Image width={0} height={0} align="center" alt="" src="*|BRAND:LOGO|*" width="196" style="
    //                                       max-width: 196px;
    //                                       padding-bottom: 0;
    //                                       display: inline !important;
    //                                       vertical-align: bottom;
    //                                     " class="mcnImage" />
    //                             </td>
    //                           </tr>
    //                         </tbody>
    //                       </table>
    //                     </td>
    //                   </tr>
    //                 </tbody>
    //               </table>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td valign="top" id="templateBody">
    //               <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
    //                 style="min-width: 100%">
    //                 <tbody class="mcnTextBlockOuter">
    //                   <tr>
    //                     <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px">
                          
    //                     <div>
    //                       Please verify your email address: <a href='${process.env.HOST_NAME}api/auth/confirm/${user._id}'>Link</a>
    //                     </div>

    //                     </td>
    //                   </tr>
    //                 </tbody>
    //               </table>
    //             </td>
    //           </tr>

    //           <table
    //             align="left"
    //             border="0"
    //             cellpadding="0"
    //             cellspacing="0"
    //             style="max-width: 100%; min-width: 100%"
    //             width="100%"
    //             class="mcnTextContentContainer"
    //           >
    //             <tbody>
    //               <tr>
    //                 <td
    //                   valign="top"
    //                   class="mcnTextContent"
    //                   style="
    //                     padding-top: 0;
    //                     padding-right: 18px;
    //                     padding-bottom: 9px;
    //                     padding-left: 18px;
    //                   "
    //                 >
                      

    //                 </td>
    //               </tr>
    //             </tbody>
    //           </table>
    //               <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"
    //                 style="min-width: 100%">
    //                 <tbody class="mcnDividerBlockOuter">
    //                   <tr>
    //                     <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 10px 18px 25px">
    //                       <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="
    //                               min-width: 100%;
    //                               border-top: 2px solid #eeeeee;
    //                             ">
    //                         <tbody>
    //                           <tr>
    //                             <td>
    //                               <span></span>
    //                             </td>
    //                           </tr>
    //                         </tbody>
    //                       </table>
    
    //                     </td>
    //                   </tr>
    //                 </tbody>
    //               </table>
    //               <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
    //                 style="min-width: 100%">
    //                 <tbody class="mcnTextBlockOuter">
    //                   <tr>
    //                     <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px">
    
    //                       <table align="left" border="0" cellpadding="0" cellspacing="0"
    //                         style="max-width: 100%; min-width: 100%" width="100%" class="mcnTextContentContainer">
    //                         <tbody>
    //                           <tr>
    //                             <td valign="top" class="mcnTextContent" style="
    //                                     padding-top: 0;
    //                                     padding-right: 18px;
    //                                     padding-bottom: 9px;
    //                                     padding-left: 18px;
    //                                     text-align: center
    //                                   ">
    //                               <em>Copyright © * ${moment().format('YYYY')} <a href="https://www.ziyen.com/" target="_blank">Ziyen Inc.</a>, All rights reserved.</em>
    //                               <br />
    //                               <br />
    //                               <br />
    //                             </td>
    //                           </tr>
    //                         </tbody>
    //                       </table>
    
    //                     </td>
    //                   </tr>
    //                 </tbody>
    //               </table>
    //             </td>
    //           </tr>
    //         </table>
    
    //       </td>
    //     </tr>
    //   </table>
    //   </center>
    // </body>
    
    // </html>
    // `;

    // var token = "WeNeedToCreateApiForVerifyToken";
    const html = `
    <!DOCTYPE html>
    <html>
      <head> <title>SUBJECT</title>
      </head>
      <body>
         <div>
            <div style={{
            display: 'flex',
            justify-content: 'center',
            padding-top: '10px',
        }}>
            <div>
                <h4>Welcome To Rebuilding Iraq</h4>
            </div>
            </div>
            <div style={{
            display: 'flex',
            justify-content: 'center',
            padding-top: '10px',
        }}>
            <div >
            <Image width={0} height={0} src="http://18.221.99.84/images/EnergyToken/rebuilding-iraq-logo.png"
                    alt="logo" width=60 height=60/> 
            </div>
            <div>
                <p> Welcome to Rebuilding Iraq Please select the following link to complete your registration </p>
            </div>
            </div>
            <div style={{
            display: 'flex',
            justify-content: 'center',
            padding-bottom: '40px',
            padding-top: '10px',
        }}>
            <div style={{
                background: '#1dd3f8',
                padding: '10px',
                fontSize: '14px',
                fontFamily: 'sans-serif',
            }}>
                <a href='${process.env.HOST_NAME}api/auth/confirm/${user._id}'>Click Here</a>
            </div>
            </div>
          </div>
      </body>
    </html>`

    const text = "";

    const sendmail = await sendMail({
      emails: [
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          type: "to",
        },
      ],
      html: html,
      text: text,
      subject: "Confirm Your Email Address",
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "something went wrong!" });
  }
});

export default connectDb(handler);
