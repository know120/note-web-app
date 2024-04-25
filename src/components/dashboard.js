import React from 'react';

function Dashboard({total}) {
    return (
        <div className="area">
            <h3>Dashboard</h3>
            <ul>
                <li>Total: <span>{total}</span></li>
                <li>Added: <span>{0}</span></li>
                <li>Edited: <span>{0}</span></li>
                <li>Deleted: <span>{0}</span></li>
            </ul>
        </div>
    );
}

export default Dashboard;