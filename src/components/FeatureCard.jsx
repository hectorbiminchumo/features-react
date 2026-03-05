function FeatureCard({ title, description, children, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-secondary p-4 sm:p-6">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white flex-shrink-0" />}
          <div className="min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold text-white truncate">{title}</h2>
            <p className="text-blue-100 mt-1 text-sm">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-6 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

export default FeatureCard;