function FeatureCard({ title, description, children, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-8 h-8 text-white" />}
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-blue-100 mt-1">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default FeatureCard;