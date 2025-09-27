
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const { onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)

  return (
    <div className='sidebar'>
      <div className="top">
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className='menu' 
          src={assets.menu_icon} 
          alt="" 
        />

        <div onClick={()=>newChat()}className="new-chart">
          <img src={assets.plus_icon} alt="" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div 
                key={index} 
                className="recent-entry"
                onClick={() => {
                  setRecentPrompt(item);
                  onSent(item);
                }}
              >
                <img src={assets.message_icon} alt="" />
                <p>{item} ...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
