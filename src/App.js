import { useEffect, useState } from 'react';
import './App.css';
import {Auth} from "./components/auth";
import {db,auth,storage} from './config/firebase';
import {getDocs ,collection,addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore';
import {ref,uploadBytes} from 'firebase/storage';

function App() {
  const [MovieList,setMovieList]=useState([]);
  
const [newMovieTitle,setNewMovieTitle]=useState("");
const [newReleaseDate,setNewReleaseDate]=useState("0");
const [isNewMovieOscar,setisNewMovieOscar]=useState(false);
const [updatedTitle,setUpdatedTitle]=useState("");
const [fileUpload,setFieUpload]=useState(null);

  const movieCollectionRef=collection(db,"movies")

  const getMovieList=async()=>{
    try{
      const data=await getDocs(movieCollectionRef);
      const filteredData=data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id,
      }));
      setMovieList(filteredData);
    }
    catch(err)
    {
      console.log(err);
    }
    
  };

const deleteMovie=async(id)=>{
  const movieDoc=doc(db,"movies",id);
  await deleteDoc(movieDoc);
};

const UpdateMovieTitle=async(id)=>{
  const movieDoc=doc(db,"movies",id);
  await updateDoc(movieDoc,{title:updatedTitle});
};


const uploadFile=async()=>{
  if(!uploadFile)
  return;
const filesFolderRef=ref(storage,`projectFiles/${fileUpload.name}`);
try{
  await uploadBytes(filesFolderRef,fileUpload);
}
catch(err)
{
  console.err(err);
}
}
  useEffect(()=>{
    
    getMovieList();
  }, []);

const onSubmitMovie=async()=>{
  try{
    await addDoc(movieCollectionRef,{
      title:newMovieTitle,
      releaseDate:newReleaseDate,
      receivedAnOscar:isNewMovieOscar,
      userId:auth?.currentUser?.uid,
    });
    getMovieList();
  }
  catch(err)
  {
    console.error(err);
  }
  
};


  return (
    <div className="App">
      <Auth />
     
    <div>
      <input placeholder='Movie Title'  onChange={(e)=>setNewMovieTitle(e.target.value)}  />
      <input placeholder='Release Date' type='number'
      onChange={(e)=>setNewReleaseDate(Number(e.target.value))}
      />
      <input type='checkbox'  checked={isNewMovieOscar}  onChange={(e)=> setisNewMovieOscar(e.target.checked)} />
      <label> Received an Oscar</label>
      <button  onClick={onSubmitMovie}>Submit Movie</button>
    </div>

     <div>
      {
        MovieList.map((movie)=>(
          <div>
            <h1 style={{color:movie.receivedAnOscar?"green":"red"}}>
              
              {movie.title}
            </h1>
            <p>Date : {movie.releaseDate} </p>
            <button  onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
            <input  placeholder='new title'  onChange={(e)=> setUpdatedTitle(e.target.value)} />
            <button  onClick={()=>UpdateMovieTitle(movie.id)}>Update title</button>

            </div>
        ))
      }
     </div>
    <div>
      <input  type='file'  onChange={(e)=>setFieUpload(e,target.files[0])} />
      <button  onClick={uploadFile}>Upload file</button>
    </div>

    </div>
  );
}

export default App;
