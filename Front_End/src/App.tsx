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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Tea[]>("/api/getTeas");
        setTeas(response.data); 
        console.log(response)
      } catch (error) {
        console.error('Error fetching teas:', error);
      }
    };

    fetchData(); 
  }, [teas]); 

  return (
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
  );
}

export default App;
