

const Footer = () => {

  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-white bg-black">
      <div className="container text-center max-w-[1070px] px-5 mx-auto">
        <span className="w-full text-[13px] text-white/80">&copy; {currentYear} Figment Clique.</span>
      </div>
    </div>
  )
}

export default Footer