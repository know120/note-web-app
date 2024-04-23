import React from 'react';

function Dashboard(props) {
    return (
        <div className="area">
            <h3>Dashboard</h3>
            <ul>
                <li>Added: <span>{0}</span></li>
                <li>Edited: <span>{0}</span></li>
                <li>Deleted: <span>{0}</span></li>
            </ul>
        </div>
    );
}

export default Dashboard;