const StatusIndicator = ({ 
  state = 'online', // 'online' | 'standby' | 'offline'
  label, 
  showLabel = true,
  labelFirst = false,
  className = "" 
}) => {
  const configs = {
    online: {
      colorClass: 'status-blink-online',
      defaultLabel: 'NOMINAL'
    },
    standby: {
      colorClass: 'status-blink-standby',
      defaultLabel: 'PROCESSING'
    },
    offline: {
      colorClass: 'status-blink-offline',
      defaultLabel: 'RESTRICTED'
    }
  };

  const config = configs[state] || configs.online;
  const displayLabel = label || config.defaultLabel;

  const dot = (
    <div className={`w-[6px] h-[6px] rounded-full shrink-0 ${config.colorClass}`} />
  );

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {labelFirst && showLabel && (
        <span className="text-[10px] font-mono tracking-widest uppercase">{displayLabel}</span>
      )}
      {dot}
      {!labelFirst && showLabel && (
        <span className="text-[10px] font-mono tracking-widest uppercase">{displayLabel}</span>
      )}
    </div>
  );
};

export default StatusIndicator;
