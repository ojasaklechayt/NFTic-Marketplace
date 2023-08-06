const Navbar = () => {
    return (
        <div className="bg-[#D9D9D9] bg-opacity-20 h-[50px] flex flex-row items-center px-10 space-x-40 cursor-pointer">
            <p className="hover:underline opacity-80">Home</p>
            <p className="hover:underline opacity-80">Explore</p>
            <p className="hover:underline opacity-80">Your Collection</p>
            <p className="hover:underline opacity-80">Create</p>
        </div>
    );
};

export default Navbar;
