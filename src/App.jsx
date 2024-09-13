import { useEffect, useRef, useState } from "react";

function App() {
  const [clickRandom, setClickRandom] = useState(false);
  const [randomName, setRandemName] = useState("");
  const [img, setImg] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [removeIndex, setRemoveIndex] = useState(null);
  const [current_Name_index,setCurrent_Name_index]=useState(0)

  const divref =useRef()

  const [names, setNames] = useState([
    "Appu",
    "Naveen",
    "Karthi",
    "Arul",
    "Tamil",
    "Praveen",
    "Dhinesh",
    "Suriya",
    "Mani",
    "Swetha",
  ]);

  const [loopWord, setLoopWord] = useState([]);
  // console.log(loopWord);

  const getRandomName = () => {
    let looplist = [];
    let j = 0;
    for (let i = 0; i <= names.length - 1; i++) {
      j++;

      const randomName =
        names[Math.abs(Math.floor(Math.random() * names.length))];
      // console.log(loopWord.includes(randomName.toString()));

      if (!looplist.includes(randomName.toString())) {
        // console.log(randomName);
        looplist.push(randomName);
      }

      if (looplist.length !== names.length) {
        // console.log(looplist.length, names.length, looplist, names);

        if (j > 100) {
          // console.log("10000000");
          break;
        }
        i = 0;
      } else {
        setLoopWord(looplist);
        setClickRandom(true);
        return;
      }
    }
    // console.log(looplist);

    // console.log("random");
  };
  // console.log("setClickRandom", clickRandom);

  


  const handleRemove = (index) => {
    // console.log(removeIndex >= 0, !removeIndex === index, removeIndex, index);

    if (!removeIndex >= 0 && removeIndex !== index) {
      setRemoveIndex(index);
      // console.log("!");
    } else {
      // console.log(index, "remove");
      setNames((prev) => prev.filter((item, i) => i != index));
      setRemoveIndex(null);
    }
  };
  const handleAddName = (e) => {
    e.preventDefault();
    if (nameInput) {
      setNames((prev) => [...prev, nameInput]);
      setNameInput("");
    }
  };
  // console.log(names);
  // console.log(removeIndex);

  const handelChange=(e,d)=>{
    e.stopPropagation() 
    // console.log('enterd');
    
    if (d==='plus') {
      if (current_Name_index!==loopWord.length-1) {
        
        setCurrent_Name_index(current_Name_index+1)
      }
    }else if(d==='less'){
   if (current_Name_index>=1)   setCurrent_Name_index(current_Name_index-1)

    }

    if (current_Name_index ===loopWord.length-1) {
      setClickRandom(false)
      setCurrent_Name_index(0)
    }
    // console.log(d);
    // console.log(current_Name_index);
    // console.log(loopWord);
    
  }


  useEffect(()=>{

    const imgavail=[
     
    ]

    if(imgavail.includes(loopWord[current_Name_index])){
      setImg(`./${loopWord[current_Name_index]}.jpg`)
    }else{

      setImg('https://static.vecteezy.com/system/resources/thumbnails/026/619/142/small/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg')
    }
  },[handelChange])

  return (
    <div  className="flex flex-col justify-center items-center h-full w-full">
      <div className="p-3 w-80 justify-center flex flex-col gap-3 relative rounded ">
        <button
          onClick={getRandomName}
          type="button"
          className="text-white px-3 py-2 bg-gray-800 rounded font-Bold text-2xl"
        >
          Get Random
        </button>
        {clickRandom ? (
          <div className=" absolute inset-0 rounded flex flex-col justify-between items-center gap-6 h-full text-white p-5 bg-gray-800 rounded font-Bold text-2xl">
            <div className="flex flex-col justify-between items-center gap-6">
              <h1 className="text-center  font-bold ">Congurates</h1>
              <img src={`${img}`} alt=""  className="h-48 w-48 rounded-full object-cover" />
              <h1 className="text-center  font-bold text-4xl">{loopWord[current_Name_index]}</h1>
            </div>

            <div ref={divref} className="flex flex-row gap justify-between  w-full">
              <button  onClick={(e)=>handelChange(e,'less')}
                type="button"
                className="py-3 px-3 text-white bg-blue-600 rounded"
              > <i className="fa-solid fa-chevron-left"></i> Previous </button>
              <button onClick={(e)=>handelChange(e,'plus')}
                type="button"
                className="py-3 px-3 rounded text-white bg-blue-600"
              >Next <i className="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
        ) : null}

        <ul className="grid-cols-3 grid grid-flow-rows gap-2 p-2 h-72 w-80 items-center">
          {names.map((name, index) => (
            <li
              onClick={() => handleRemove(index)}
              className={` border-2  w-fit h-fit py-2 min-w-full max-w-full px-3 ml-1 rounded-full overflow-x-scroll hide-scrollbar text-sm  text-center ${
                removeIndex === index ? "bg-blue-400" : ""
              }`}
              key={index}
            >
              {removeIndex === index ? "Remove" : name}
            </li>
          ))}
        </ul>

        <form className="w-full " onSubmit={(e) => handleAddName(e)}>
          <input
            autoFocus
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className=" w-full outline-none border rounded p-1 mb-2"
          />
          <button
            onClick={handleAddName}
            className="w-full text-white px-3 py-2 bg-gray-800 rounded font-Bold text-md"
            type="submit"
          >
            {" "}
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
