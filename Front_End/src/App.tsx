  import { useEffect, useState } from 'react';
  import axios from 'axios';

  import './App.css';

  interface Tea {
    id?: number; 
    name: string;
    price: number;
  }
  function App() {
    const [teas, setTeas] = useState <Tea[]>([]); 
    const [data, getData] =useState <Tea>({})
    const onClick = async ()  =>{
      try
      {

        const send = await axios.get<Tea>("/api/1");
        getData(send.data)
        console.log(data)
      }
      catch(err)
      {
        console.log(err)
      }

    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<Tea[]>("/api/getTeas/1");
          setTeas(response.data); 
          // console.log(response)
        } catch (error) {
          console.error('Error fetching teas:', error);
        }
      };

      fetchData(); 
    }, [teas]); 

    return (
      <>
      <div>
      {teas.length > 0 ? (
        <ul>    
          {teas.map((tea) => (
            <li key={tea.id  }>
              {tea.name}
                ${tea.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading teas...</p>
      )}
    </div>
    <div>
      {/* <input type='button' onClick={onClick}> hello</input> */}
      <button onClick={onClick}>helo</button>
      {
        data?.name && (
          <li>
            {data.name}
          </li>
        )
      }
    </div>
      </>
    );
  }

  export default App;
