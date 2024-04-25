import React from 'react';

function Dashboard({ total, added, edited, deleted }) {
    return (
        <div className="area">
            <h3>Dashboard</h3>
            <ul>
                <li>Total: <span>{total}</span></li>
                <li>Added: <span>{added}</span></li>
                <li>Edited: <span>{edited}</span></li>
                {/* <li>Deleted: <span>{deleted}</span></li> */}
            </ul>
        </div>
    );
}

export default Dashboard;