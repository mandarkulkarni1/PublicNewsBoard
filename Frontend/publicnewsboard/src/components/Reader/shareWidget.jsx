import { Button } from "@material-ui/core";
import { AiOutlineWhatsApp, AiOutlineFacebook } from "react-icons/ai";

export const Share = (props) => {
  const { newsId, title } = props;

  const whastapp =
    "https://web.whatsapp.com/send?text=textToshare" +
    { newsId } +
    "/" +
    { title };
  const facebook =
    "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse";
  return (
    <span>
      <span className="m-2 p-2">
        <a href={whastapp}>
          <AiOutlineWhatsApp className="bg-success rounded" size="45"/>
        </a>
      </span>
      <span className="m-2 p-2">
        <a href={facebook}  className="p-3">
          <AiOutlineFacebook className="bg-primary rounded" size="45"/>
        </a>
      </span>
    </span>
  );
};
