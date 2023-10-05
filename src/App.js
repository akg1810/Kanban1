import React,{useEffect,useState} from 'react';
import LayoutComponent from './Components/LayoutComponent';

function App() {

  const [data,setData] = useState([]);
  const apiGet = async () => {
    try {
      const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    apiGet();
  }, []); 

  const groupDataByStatus = (data) => {
    if (!data || !data.tickets) return {};
  
    return data.tickets.reduce((grouped, ticket) => {
      const { status } = ticket;
      if (!grouped[status]) {
        grouped[status] = [];
      }
      grouped[status].push(ticket);
      return grouped;
    }, {});
  }

  const groupDataByUser = (data) => {
    if (!data || !data.tickets) return {};
  
    return data.tickets.reduce((grouped, ticket) => {
      const { userId } = ticket;
      if (!grouped[userId]) {
        grouped[userId] = [];
      }
      grouped[userId].push(ticket);
      return grouped;
    }, {});
  }

  const groupDataByPriority = (data) => {
    if (!data || !data.tickets) return {};
  
    return data.tickets.reduce((grouped, ticket) => {
      const { priority } = ticket;
      if (!grouped[priority]) {
        grouped[priority] = [];
      }
      grouped[priority].push(ticket);
      return grouped;
    }, {});
  }

  const groupedStatus = groupDataByStatus(data);
  const groupedUser = groupDataByUser(data);
  const groupedPriority = groupDataByPriority(data);

  const [layout, setLayout] = useState(localStorage.getItem('layout') || 'status');

  useEffect(() => {
    localStorage.setItem('layout', layout);
  }, [layout]);

  const changeLayout = (newLayout) => {
    setLayout(newLayout);
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='background flex'>
        <div className='header'>
          <button onClick={toggleDropdown} className="dropdown-button" style={{paddingBlock:'7px',paddingInline:'5px'}}>
            Display 🔽
          </button>
          {isOpen && (
          <div className="dropdown-content flex">
            <div style={{display:'flex', flexDirection:'row', gap:'51px'}}>
              <div>Grouping</div>
              <div>
              <button onClick={()=>changeLayout('status')} style={{paddingBlock:'5px',paddingInline:'3px'}}>Status</button>
              <button onClick={()=>changeLayout('user')} style={{paddingBlock:'5px',paddingInline:'3px'}}>User</button>
              <button onClick={()=>changeLayout('priority')} style={{paddingBlock:'5px',paddingInline:'3px'}}>Priority</button>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'row', gap:'51px'}}>
              <div>Ordering</div>
              <div>
                <button style={{paddingBlock:'5px',paddingInline:'3px'}}>Priority</button>
                <button style={{paddingBlock:'5px',paddingInline:'3px'}}>Title</button>
              </div>
            </div>
          </div>
          )}
        </div>
        
        <div className='data_background flex'>
          {layout === 'status' && <LayoutComponent groupedData={groupedStatus}/>}
          {layout === 'user' && <LayoutComponent groupedData={groupedUser}/>}
          {layout === 'priority' && <LayoutComponent groupedData={groupedPriority}/>}
        </div>
      </div>
    </>
  );
}

export default App;
