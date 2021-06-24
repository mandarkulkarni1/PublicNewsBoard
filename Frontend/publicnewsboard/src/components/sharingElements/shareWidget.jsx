import { useState } from "react";
import { AiOutlineWhatsApp,AiOutlineFacebook, AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";
const Share = (props) => {
    const {newsId,title} = props;

    const whastapp = "https://web.whatsapp.com/send?text=textToshare" + {newsId} + "/" + {title}; 
    const facebook = "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
    return ( <span>
      <a href={whastapp}><AiOutlineWhatsApp/></a>
        <a href={facebook}><AiOutlineFacebook/></a>
        {/* <a href=""><AiOutlineMail/></a> */}
    </span> );
}
 
export default Share;