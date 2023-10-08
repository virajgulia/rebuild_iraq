import connectDb from "../../../middleware/dbMiddleware";
import moment from "moment";

const nextConnect = require("next-connect");
const Users = require("../../../models/user");
const handler = nextConnect();
const checkAuth = require("../../../middleware/authentication");

const mailchimp = require("@mailchimp/mailchimp_transactional")(
  "80ba700148139f0d8998c531c76fe109-us7"
);

const mandrill = require("mandrill-api/mandrill");
const mandrill_client = new mandrill.Mandrill(process.env.MAILCHIM_API_KEY);
// const mandrill_client = new mandrill.Mandrill("FHAT9ejKpKrKUuvWokUs9Q");

const logo = `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`;

const templete = `
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <!-- NAME: 1 COLUMN -->
        <!--[if gte mso 15]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>*|SUBJECT|*</title>
        
    <style type="text/css">
		p{
			margin:10px 0;
			padding:0;
		}
		table{
			border-collapse:collapse;
		}
		h1,h2,h3,h4,h5,h6{
			display:block;
			margin:0;
			padding:0;
		}
		img,a img{
			border:0;
			height:auto;
			outline:none;
			text-decoration:none;
		}
		body,#bodyTable,#bodyCell{
			height:100%;
			margin:0;
			padding:0;
			width:100%;
		}
		.mcnPreviewText{
			display:none !important;
		}
		#outlook a{
			padding:0;
		}
		img{
			-ms-interpolation-mode:bicubic;
		}
		table{
			mso-table-lspace:0pt;
			mso-table-rspace:0pt;
		}
		.ReadMsgBody{
			width:100%;
		}
		.ExternalClass{
			width:100%;
		}
		p,a,li,td,blockquote{
			mso-line-height-rule:exactly;
		}
		a[href^=tel],a[href^=sms]{
			color:inherit;
			cursor:default;
			text-decoration:none;
		}
		p,a,li,td,body,table,blockquote{
			-ms-text-size-adjust:100%;
			-webkit-text-size-adjust:100%;
		}
		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			line-height:100%;
		}
		a[x-apple-data-detectors]{
			color:inherit !important;
			text-decoration:none !important;
			font-size:inherit !important;
			font-family:inherit !important;
			font-weight:inherit !important;
			line-height:inherit !important;
		}
		#bodyCell{
			padding:10px;
		}
		.templateContainer{
			max-width:600px !important;
		}
		a.mcnButton{
			display:block;
		}
		.mcnImage,.mcnRetinaImage{
			vertical-align:bottom;
		}
		.mcnTextContent{
			word-break:break-word;
		}
		.mcnTextContent img{
			height:auto !important;
		}
		.mcnDividerBlock{
			table-layout:fixed !important;
		}
	/*
	@tab Page
	@section Background Style
	@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
	*/
		body,#bodyTable{
			/*@editable*/background-color:#FAFAFA;
		}
	/*
	@tab Page
	@section Background Style
	@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
	*/
		#bodyCell{
			/*@editable*/border-top:0;
		}
	/*
	@tab Page
	@section Email Border
	@tip Set the border for your email.
	*/
		.templateContainer{
			/*@editable*/border:0;
		}
	/*
	@tab Page
	@section Heading 1
	@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
	@style heading 1
	*/
		h1{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:26px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 2
	@tip Set the styling for all second-level headings in your emails.
	@style heading 2
	*/
		h2{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:22px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 3
	@tip Set the styling for all third-level headings in your emails.
	@style heading 3
	*/
		h3{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:20px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 4
	@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
	@style heading 4
	*/
		h4{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:18px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Preheader
	@section Preheader Style
	@tip Set the background color and borders for your email's preheader area.
	*/
		#templatePreheader{
			/*@editable*/background-color:#fafafa;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Preheader
	@section Preheader Text
	@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
	*/
		#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			/*@editable*/color:#656565;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Preheader
	@section Preheader Link
	@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
	*/
		#templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
			/*@editable*/color:#656565;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Header
	@section Header Style
	@tip Set the background color and borders for your email's header area.
	*/
		#templateHeader{
			/*@editable*/background-color:#FFFFFF;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:0;
		}
	/*
	@tab Header
	@section Header Text
	@tip Set the styling for your email's header text. Choose a size and color that is easy to read.
	*/
		#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:16px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Header
	@section Header Link
	@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
	*/
		#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
			/*@editable*/color:#007C89;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Body
	@section Body Style
	@tip Set the background color and borders for your email's body area.
	*/
		#templateBody{
			/*@editable*/background-color:#FFFFFF;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:2px solid #EAEAEA;
			/*@editable*/padding-top:0;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Body
	@section Body Text
	@tip Set the styling for your email's body text. Choose a size and color that is easy to read.
	*/
		#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:16px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Body
	@section Body Link
	@tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
	*/
		#templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
			/*@editable*/color:#007C89;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Footer
	@section Footer Style
	@tip Set the background color and borders for your email's footer area.
	*/
		#templateFooter{
			/*@editable*/background-color:#FAFAFA;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Footer
	@section Footer Text
	@tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
	*/
		#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			/*@editable*/color:#656565;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:center;
		}
	/*
	@tab Footer
	@section Footer Link
	@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
	*/
		#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
			/*@editable*/color:#656565;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	@media only screen and (min-width:768px){
		.templateContainer{
			width:600px !important;
		}

}	@media only screen and (max-width: 480px){
		body,table,td,p,a,li,blockquote{
			-webkit-text-size-adjust:none !important;
		}

}	@media only screen and (max-width: 480px){
		body{
			width:100% !important;
			min-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnRetinaImage{
			max-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImage{
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
			max-width:100% !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnBoxedTextContentContainer{
			min-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupContent{
			padding:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
			padding-top:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
			padding-top:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardBottomImageContent{
			padding-bottom:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockInner{
			padding-top:0 !important;
			padding-bottom:0 !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockOuter{
			padding-top:9px !important;
			padding-bottom:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnTextContent,.mcnBoxedTextContentColumn{
			padding-right:18px !important;
			padding-left:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
			padding-right:18px !important;
			padding-bottom:0 !important;
			padding-left:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcpreview-image-uploader{
			display:none !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 1
	@tip Make the first-level headings larger in size for better readability on small screens.
	*/
		h1{
			/*@editable*/font-size:22px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 2
	@tip Make the second-level headings larger in size for better readability on small screens.
	*/
		h2{
			/*@editable*/font-size:20px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 3
	@tip Make the third-level headings larger in size for better readability on small screens.
	*/
		h3{
			/*@editable*/font-size:18px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 4
	@tip Make the fourth-level headings larger in size for better readability on small screens.
	*/
		h4{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Boxed Text
	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Preheader Visibility
	@tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
	*/
		#templatePreheader{
			/*@editable*/display:block !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Preheader Text
	@tip Make the preheader text larger in size for better readability on small screens.
	*/
		#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Header Text
	@tip Make the header text larger in size for better readability on small screens.
	*/
		#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Body Text
	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Footer Text
	@tip Make the footer content text larger in size for better readability on small screens.
	*/
		#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}</style></head>
    <body>
        <!--*|IF:MC_PREVIEW_TEXT|*-->
        <!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span><!--<![endif]-->
        <!--*|END:IF|*-->
        <center>
            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                <tr>
                    <td align="center" valign="top" id="bodyCell">
                        <!-- BEGIN TEMPLATE // -->
                        <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                        <tr>
                        <td align="center" valign="top" width="600" style="width:600px;">
                        <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                            <tr>
                                <td valign="top" id="templatePreheader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px; text-align: center;">
                        
                            <a href="*|ARCHIVE|*" target="_blank">View this email in your browser</a>
                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table></td>
                            </tr>
                            <tr>
                                <td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
    <tbody class="mcnImageBlockOuter">
            <tr>
                <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                        <tbody><tr>
                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                
                                    
                                        <Image width={0} height={0} align="center" alt="" src=${logo} width="196" style="max-width:196px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
                                    
                                
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
    </tbody>
</table></td>
                            </tr>
                            <tr>
                                <td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody>
					<tr>
					<td>
					  <h1>You have new content!</h1>
					</td>
				  </tr>
					<tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                            <h4 style="text-align: center;">Tender Alerts for {date}</h4>

<ul>
	<li>Tender link</li>
	<li>Tender link</li>
	<li>Tender link</li>
</ul>

                        </td>
                    </tr>
					<tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                            <h4 style="text-align: center;">News Alerts for {date}</h4>

<ul>
	<li>News link</li>
	<li>News link</li>
	<li>News link</li>
</ul>

                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table></td>
                            </tr>
                            <tr>
                                <td valign="top" id="templateFooter"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width:100%;">
    <tbody class="mcnFollowBlockOuter">
        <tr>
            <td align="center" valign="top" style="padding:9px" class="mcnFollowBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width:100%;">
    <tbody><tr>
        <td align="center" style="padding-left:9px;padding-right:9px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnFollowContent">
                <tbody><tr>
                    <td align="center" valign="top" style="padding-top:9px; padding-right:9px; padding-left:9px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0">
                            <tbody><tr>
                                <td align="center" valign="top">
                                    <!--[if mso]>
                                    <table align="center" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                    <![endif]-->
                                    
                                        <!--[if mso]>
                                        <td align="center" valign="top">
                                        <![endif]-->
                                        
                                        
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                <tbody><tr>
                                                    <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                            <tbody><tr>
                                                                <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                        <tbody><tr>
                                                                            
                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                    <a href="http://www.twitter.com/" target="_blank"><Image width={0} height={0} src="https://cdn-images.mailchimp.com/icons/social-block-v2/color-twitter-48.png" alt="Twitter" style="display:block;" height="24" width="24" class=""></a>
                                                                                </td>
                                                                            
                                                                            
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        
                                        <!--[if mso]>
                                        </td>
                                        <![endif]-->
                                    
                                        <!--[if mso]>
                                        <td align="center" valign="top">
                                        <![endif]-->
                                        
                                        
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                <tbody><tr>
                                                    <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                            <tbody><tr>
                                                                <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                        <tbody><tr>
                                                                            
                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                    <a href="http://www.facebook.com" target="_blank"><Image width={0} height={0} src="https://cdn-images.mailchimp.com/icons/social-block-v2/color-facebook-48.png" alt="Facebook" style="display:block;" height="24" width="24" class=""></a>
                                                                                </td>
                                                                            
                                                                            
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        
                                        <!--[if mso]>
                                        </td>
                                        <![endif]-->
                                    
                                        <!--[if mso]>
                                        <td align="center" valign="top">
                                        <![endif]-->
                                        
                                        
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                <tbody><tr>
                                                    <td valign="top" style="padding-right:0; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                            <tbody><tr>
                                                                <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                        <tbody><tr>
                                                                            
                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                    <a href="http://mailchimp.com" target="_blank"><Image width={0} height={0} src="https://cdn-images.mailchimp.com/icons/social-block-v2/color-link-48.png" alt="Website" style="display:block;" height="24" width="24" class=""></a>
                                                                                </td>
                                                                            
                                                                            
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        
                                        <!--[if mso]>
                                        </td>
                                        <![endif]-->
                                    
                                    <!--[if mso]>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
        </td>
    </tr>
</tbody></table>

            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 10px 18px 25px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EEEEEE;">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
<!--            
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                            <em>Copyright © *|CURRENT_YEAR|* *|LIST:COMPANY|*, All rights reserved.</em>
<br>
*|IFNOT:ARCHIVE_PAGE|*
    *|LIST:DESCRIPTION|*
    <br>
    <br>
    <strong>Our mailing address is:</strong>
    <br>
    *|HTML:LIST_ADDRESS_HTML|* *|END:IF|*
    <br>
    <br>
	Want to change how you receive these emails?<br>
    You can <a href="*|UPDATE_PROFILE|*">update your preferences</a> or <a href="*|UNSUB|*">unsubscribe from this list</a>.
    <br>
    <br>
    *|IF:REWARDS|* *|HTML:REWARDS|*
*|END:IF|*

                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table></td>
                            </tr>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                        <!-- // END TEMPLATE -->
                    </td>
                </tr>
            </table>
        </center>
    </body>
</html>
`;

handler.get(async (req, res) => {
  console.log("key: ", process.env.MAILCHIM_API_KEY);
  const message = {
    html: templete,
    text: "Test send mail mandrill",
    subject: "example subject",
    from_email: "hello@rebuildingiraq.net",
    from_name: "Rebuilding Support",
    to: [
      {
        email: "vesa.rs.92@gmail.com",
        name: "Recipient Name",
        type: "to",
      },
      // {
      //   email: "phungnv.bkdn@gmail.com",
      //   name: "Recipient Name",
      //   type: "to",
      // },
      // {
      //   email: "mrsjiodev@gmail.com",
      //   name: "Recipient Name",
      //   type: "to",
      // },
    ],
    headers: {
      "Reply-To": "message.reply@example.com",
    },
    important: false,
    track_opens: null,
    track_clicks: null,
    auto_text: null,
    auto_html: null,
    inline_css: null,
    url_strip_qs: null,
    preserve_recipients: null,
    view_content_link: null,
    bcc_address: "message.bcc_address@example.com",
    tracking_domain: null,
    signing_domain: null,
    return_path_domain: null,
    merge: true,
    merge_language: "mailchimp",
    global_merge_vars: [
      {
        name: "merge1",
        content: "merge1 content",
      },
    ],
    merge_vars: [
      {
        rcpt: "recipient.email@example.com",
        vars: [
          {
            name: "merge2",
            content: "merge2 content",
          },
        ],
      },
    ],
    tags: ["password-resets"],
    // subaccount: "customer-123",
    google_analytics_domains: ["example.com"],
    google_analytics_campaign: "message.from_email@example.com",
    metadata: {
      website: "www.example.com",
    },
    recipient_metadata: [
      {
        rcpt: "recipient.email@example.com",
        values: {
          user_id: 123456,
        },
      },
    ],
    // attachments: [
    //   {
    //     type: "text/plain",
    //     name: "myfile.txt",
    //     content: "ZXhhbXBsZSBmaWxl",
    //   },
    // ],
    // images: [
    //   {
    //     type: "image/png",
    //     name: "IMAGECID",
    //     content: "ZXhhbXBsZSBmaWxl",
    //   },
    // ],
  };
  const async = false;
  const ip_pool = "Main Pool";
  const send_at = moment.utc("2020-04-05");

  mandrill_client.messages.send(
    { message: message, async: async, ip_pool: ip_pool },
    function (result) {
      console.log(result);

      res.status(200).json(result);
      /*
    [{
            "email": "recipient.email@example.com",
            "status": "sent",
            "reject_reason": "hard-bounce",
            "_id": "abc123abc123abc123abc123abc123"
        }]
    */
    },
    function (e) {
      // Mandrill returns the error as an object with name and message keys
      console.log("A mandrill error occurred: " + e.name + " - " + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    }
  );
});

export default connectDb(handler);
