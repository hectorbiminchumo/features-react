function FeatureCard({ title, description, children, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1">

          {Icon && <Icon className="w-8 h-8 " />}
          
            <h2 className="text-2xl font-bold ">{title}</h2>
          </div>
            <p className=" mt-1">{description}</p>
          
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default FeatureCard;