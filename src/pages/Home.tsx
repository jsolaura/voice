import React from 'react';
import Header from "@/components/common/Header";
import MapWrapper from "@/components/map/MapWrapper";
import CreateButton from "@/components/common/CreateButton";

const Home = () => {
    return (
        <div className="App">
            <Header />
            <MapWrapper />
            <CreateButton />
        </div>
    );
};

export default Home;