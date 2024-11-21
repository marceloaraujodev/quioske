import { MdArrowRightAlt } from "react-icons/md";
import contactUs from "@/app/utils/whatsapp";
import c from './Card.module.css';

export default function Card({title, description, imgUrl, btnArrowText, bgColor, }) {
  return (
    <div className={c.cont} >
        <div className={c.card} style={{ backgroundColor: bgColor}}>
          <div className={c.imgContainer}>
            <img className={c.img} src={imgUrl}/>
          </div>
          <div className={c.descriptionCont}>
            <span className={c.title}>{title}</span>
            <p className={c.description}>{description}</p>
          </div>
          <div className={c.cta} onClick={() => contactUs()}>
              <span>{btnArrowText}</span> <MdArrowRightAlt size={25}/>
          </div>
        </div>
    </div>
  );
}
