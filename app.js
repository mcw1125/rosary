// ===== canonical prayers sequence =====
const prayers = [
  { id:"creed", text:"I believe in God, the Father almighty, Creator of heaven and earth; and in Jesus Christ, his only Son our Lord; who was conceived by the Holy Spirit, born of the Virgin Mary; suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. Amen." },
  { id:"our_father", text:"Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." },
  { id:"hail_mary", text:"Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen." },
  { id:"glory_be", text:"Glory be to the Father, and to the Son, and to the Holy Spirit; as it was in the beginning, is now, and ever shall be, world without end. Amen." },
  { id:"fatima_prayer", text:"O my Jesus, forgive us our sins; save us from the fires of hell; lead all souls to heaven, especially those most in need of thy mercy. Amen." },
  { id:"hail_holy_queen", text:"Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us; and after this, our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Amen." },
  { id:"final_prayer", text:"Let us pray. O God, whose only-begotten Son, by his life, death and resurrection, has purchased for us the rewards of eternal life; grant, we beseech thee, that while meditating on these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may both imitate what they contain and obtain what they promise. Through Christ our Lord. Amen." }
];

// ===== Mysteries with verses & guidance =====
const mysteriesData = {
  joyful: [
    { title:"The Annunciation", verses:["Luke 1:26-38"], guidance:"Reflect on Mary’s ‘yes’ at the angel’s announcement." },
    { title:"The Visitation",   verses:["Luke 1:39-56"], guidance:"Meditate on Mary’s charity in serving Elizabeth." },
    { title:"The Nativity",     verses:["Luke 2:1-20"],   guidance:"Contemplate the mystery of Christ’s birth." },
    { title:"The Presentation", verses:["Luke 2:22-40"], guidance:"Reflect on Simeon’s prophecy and Mary’s trust." },
    { title:"Finding in the Temple", verses:["Luke 2:41-52"], guidance:"Consider Jesus’ awareness of His Father’s will." }
  ],
  sorrowful: [
    { title:"The Agony in the Garden", verses:["Matthew 26:36-46"], guidance:"Enter into Jesus’ struggle and trust." },
    { title:"The Scourging at the Pillar", verses:["John 19:1"], guidance:"Contemplate His bodily suffering." },
    { title:"The Crowning with Thorns", verses:["Matthew 27:27-31"], guidance:"Reflect on Christ’s humility amidst mockery." },
    { title:"The Carrying of the Cross", verses:["John 19:17"], guidance:"Meditate on Jesus bearing our sins." },
    { title:"The Crucifixion", verses:["Luke 23:33-46"], guidance:"Stand at the foot of the Cross and ponder His sacrifice." }
  ],
  glorious: [
    { title:"The Resurrection", verses:["Mark 16:1-8"], guidance:"Rejoice in Christ’s victory over death." },
    { title:"The Ascension", verses:["Luke 24:50-53"], guidance:"Contemplate Jesus’ return to the Father." },
    { title:"Descent of the Holy Spirit", verses:["Acts 2:1-4"], guidance:"Reflect on the Spirit empowering the Church." },
    { title:"The Assumption", verses:["Revelation 12:1"], guidance:"Ponder Mary assumed into heaven." },
    { title:"Coronation of Mary", verses:["Revelation 12:1"], guidance:"Meditate on Mary crowned Queen of Heaven." }
  ],
  luminous: [
    { title:"Baptism in the Jordan", verses:["Matthew 3:13-17"], guidance:"Contemplate the revelation of the Trinity." },
    { title:"Wedding at Cana", verses:["John 2:1-11"], guidance:"Reflect on Mary’s intercession at Cana." },
    { title:"Proclamation of the Kingdom", verses:["Mark 1:14-15"], guidance:"Consider Jesus preaching repentance & faith." },
    { title:"The Transfiguration", verses:["Matthew 17:1-8"], guidance:"Behold Christ’s divine glory revealed." },
    { title:"Institution of the Eucharist", verses:["Luke 22:19-20"], guidance:"Ponder Christ’s gift of Himself in the Eucharist." }
  ]
};

function renderRosary() {
  const day = new Date().toLocaleDateString('en-US',{weekday:'long'});
  const setKey = (
    day==='Thursday' ? 'luminous' :
    day==='Tuesday'||day==='Friday' ? 'sorrowful' :
    day==='Wednesday'||day==='Sunday' ? 'glorious' :
    'joyful'
  );
  document.getElementById('header').textContent =
    `Today: ${day} — ${setKey.charAt(0).toUpperCase()+setKey.slice(1)} Mysteries`;

  const app = document.getElementById('app');
  app.innerHTML = '';

  // Opening prayers
  prayers.slice(0,2).forEach(p => {
    const L = document.createElement('label');
    L.className='prayer';
    L.innerHTML = `<input type="checkbox"/> ${p.text}`;
    app.appendChild(L);
  });

  // Now each decade
  mysteriesData[setKey].forEach((m,i) => {
    const M = document.createElement('label');
    M.className='mystery';
    M.innerHTML = `<input type="checkbox"/> <strong>${m.title}</strong>`;
    app.appendChild(M);
    const D = document.createElement('div');
    D.className='description';
    D.textContent = m.guidance;
    app.appendChild(D);

    // Our Father
    const of = prayers.find(x=>x.id==='our_father');
    const OF = document.createElement('label');
    OF.className='prayer';
    OF.innerHTML = `<input type="checkbox"/> ${of.text}`;
    app.appendChild(OF);

    // 10 Hail Marys
    for(let j=0; j<10; j++){
      const hm = prayers.find(x=>x.id==='hail_mary');
      const HM = document.createElement('label');
      HM.className='prayer';
      HM.innerHTML = `<input type="checkbox"/> ${hm.text}`;
      app.appendChild(HM);
    }

    // Glory & Fatima
    ['glory_be','fatima_prayer'].forEach(key => {
      const txt = prayers.find(x=>x.id===key).text;
      const P = document.createElement('label');
      P.className='prayer';
      P.innerHTML = `<input type="checkbox"/> ${txt}`;
      app.appendChild(P);
    });

    app.appendChild(document.createElement('hr'));
  });

  // Closing prayers
  prayers.slice(5).forEach(p=>{
    const L = document.createElement('label');
    L.className='prayer';
    L.innerHTML = `<input type="checkbox"/> ${p.text}`;
    app.appendChild(L);
  });
}

window.addEventListener('DOMContentLoaded', renderRosary);