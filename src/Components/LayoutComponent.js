import React from 'react'

const LayoutComponent = ({groupedData}) => {
  return (
    <>
      {Object.entries(groupedData).map(([status, tickets]) => (
        <div key={status} className='column flex'>
          <div className='column-heading flex'>
            <p>{status === '0' ? 'No Priority' : status === '1' ? 'Low' : status === '2' ? 'Medium' : status === '3' ? 'High' : status==='4' ? 'Urgent': status} : {tickets.length}</p>
            <p style={{color:'gray'}}>+  ...</p>
          </div>
          {tickets.map((ticket) => (
            <div key={ticket.id} className='card flex'>
              <p style={{color:'gray'}}>{ticket.id}</p>
              <p >{ticket.title}</p>
              <div style={{display:'flex', gap:'7px'}}>
                <div style={{color:'gray'}}>...</div>
                <div style={{borderStyle:'solid', borderWidth:'0.1px', borderRadius:'4px',borderColor:'rgb(195, 195, 195)', paddingBlock:'2px', paddingInline:'4px', color:'gray'}}>{ticket.tag}</div>
              </div>
              
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default LayoutComponent
