import React from "react";

const Headers = ({ titles, currentTab, selectTab }) => {
    const handleClick = (e) => {
        const idx = parseInt(e.target.id, 10);
        selectTab(idx);
    }

    const tabs = titles.map((title, idx) => {
        const headerClass = (idx === currentTab) ? 'active' : '';
        return (
            <li key={idx} id={idx} className={headerClass} onClick={handleClick}>
                {title}
            </li>
        );
    });

    return (
        <ul className='tab-header'>
            {tabs}
        </ul>
    );
}

class Folder extends React.Component {
    constructor() {
        super();

        this.state = {
            currentTab: 0,
        };
    }

    selectTab = (idx) => {
        this.setState({ currentTab: idx });
    }

    render() {
        const { folders } = this.props.folders;
        const folder = folders[this.state.currentTab];
        const titles = folders.map(folder => folder.title);
        return (
            <div className="folder">
                <h1 className="folder__title">Folder</h1>
                <div className='tabs'>
                    <Headers
                        titles={titles}
                        currentTab={this.state.currentTab}
                        selectTab={this.selectTab}
                    />
                    <div className='tab-content'>
                        {folder.content}
                    </div>
                </div>
            </div>
        );
    }
}


export default Folder;
