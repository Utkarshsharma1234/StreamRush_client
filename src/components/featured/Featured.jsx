import { PlayArrow} from "@mui/icons-material";
import "./featured.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from '../../helper';

export default function Featured({ type , setGenre}) {
  const [content,setContent] = useState({});

  useEffect(()=>{
    const getRandomContent = async(req,res)=>{
      try{
        const res = await axios.get(`${BASE_URL}/api/movies/random${type ? "?type="+type : ""}`,{
          headers : {
            token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
          }
        })
        setContent(res.data[0]);
      }
      catch(err){
        res.status(500).json(err);
      }
    }

    getRandomContent();
  },[type])
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={e=>setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src={content?.img}
        alt=""
      />
      <div className="info">
        <img
          src={content?.imgTitle}
          alt=""
        />
        <span className="desc">
          {content?.desc}
        </span>
        <div className="buttons">
        <Link to={"/watch"} state = {{movie : content}}>
            <button className="play" >
              <PlayArrow/>
              <span>Play</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}