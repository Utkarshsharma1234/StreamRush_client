
  import { useRef, useState } from "react";
  import ListItem from "../listItem/ListItem";
  import "./list.scss";
import { ArrowBackIosOutlined , ArrowForwardIosOutlined} from "@mui/icons-material";
  
  export default function List({list}) {
    const [slideNumber, setSlideNumber] = useState(0);
    const clickLimit = window.innerWidth / 230;
  
    const listRef = useRef();
  
    const handleClick = (direction) => {
      let distance = listRef.current.getBoundingClientRect().x - 50;
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
      }
      if (direction === "right" && slideNumber < 10-clickLimit) {
        setSlideNumber(slideNumber + 1);
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      }
    };
    return (
      <div className="list">
        <span className="listTitle">{list.title}</span>
        <div className="wrapper">
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: slideNumber === 0 && "none" }}
          />
          <div className="container" ref={listRef}>
            {list.content.map((item,i)=>(
              <ListItem index={i} item={item} key={item._id} />
            ))}
          </div>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    );
  }