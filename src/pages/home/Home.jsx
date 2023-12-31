import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from '../../helper';

const Home = ({type}) => {

  const [lists,setLists] = useState([]);
  const [genre,setGenre] = useState(null);

  useEffect(()=>{
    const getRandomList = async()=>{
      try{
        const res = await axios.get(`${BASE_URL}/api/lists${type ? "?type=" + type: ""}${genre ? "&genre="+genre : ""}`,
        {
          headers : {
            token : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
          },
        })
        setLists(res.data);
      }
      catch(err){
        console.log(err);
      }
    }

    getRandomList();
  },[type,genre]);
  console.log(lists);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre = {setGenre}/>
      {lists.map((list)=>(
        <List list={list} key={list._id}/>
      ))}
    </div>
  );
};

export default Home;