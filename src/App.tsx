import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Home } from 'lucide-react';
import { InstallCafeAppButton } from './components/InstallCafeAppButton';

const LeeVaakkiUnifiedApp = () => {
    const [activeTab, setActiveTab] = React.useState('cafeMenu');

    return (
        <div>
            <div className="tab-container">
                <button onClick={() => setActiveTab('cafeMenu')}>Cafe Menu</button>
                <button onClick={() => setActiveTab('dhabaMenu')}>Dhaba Menu</button>
                <button onClick={() => setActiveTab('farmActivities')}>Farm Activities</button>
                <button onClick={() => setActiveTab('shoppingCart')}>Shopping Cart</button>
            </div>
            <motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {activeTab === 'cafeMenu' && <CafeMenu />}
                {activeTab === 'dhabaMenu' && <DhabaMenu />}
                {activeTab === 'farmActivities' && <FarmActivities />}
                {activeTab === 'shoppingCart' && <ShoppingCart />}
            </motion.div>
            
            {/* Custom PWA Install prompt trigger */}
            <InstallCafeAppButton />
        </div>
    );
};

const CafeMenu = () => <div>Cafe Menu Content</div>;
const DhabaMenu = () => <div>Dhaba Menu Content</div>;
const FarmActivities = () => <div>Farm Activities Content</div>;
const ShoppingCart = () => <div>Shopping Cart Content</div>;

export default LeeVaakkiUnifiedApp;