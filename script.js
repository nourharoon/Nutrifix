const foodBank = [
    { name: "لبنة، زيتون، خبز أسمر", cals: 300, type: "breakfast", vit: "كالسيوم، دهون صحية" },
    { name: "بيض مسلوق وخضار", cals: 250, type: "breakfast", vit: "بروتين، فيتامين A" },
    { name: "حمص بالزيت وزيتون", cals: 400, type: "breakfast", vit: "ألياف، مغنيسيوم" },
    { name: "مقلوبة دجاج وسلطة", cals: 550, type: "lunch", vit: "حديد، فيتامين B12" },
    { name: "صدر دجاج مع أرز", cals: 500, type: "lunch", vit: "بروتين عالي، فيتامين B6" },
    { name: "سمك مشوي وبطاطا", cals: 450, type: "lunch", vit: "أوميغا 3، يود" },
    { name: "جبنة بيضاء وبطيخ", cals: 200, type: "dinner", vit: "فوسفور، كالسيوم" },
    { name: "شوربة عدس ليمون", cals: 250, type: "dinner", vit: "حمض الفوليك، حديد" },
    { name: "سلطة تونة وذرة", cals: 350, type: "dinner", vit: "فيتامين E، أوميغا 3" }
];

function getBestOptions(target, type) {
    return foodBank
        .filter(item => item.type === type)
        .sort((a, b) => Math.abs(a.cals - target) - Math.abs(b.cals - target))
        .slice(0, 3);
}

function processData() {
    const w = parseFloat(document.getElementById('weight').value);
    const h = parseFloat(document.getElementById('height').value);
    const a = parseInt(document.getElementById('age').value);
    const g = document.getElementById('gender').value;
    const act = parseFloat(document.getElementById('activity').value);

    if (!w || !h || !a) return alert("يرجى إكمال البيانات");

    const bmi = w / ((h/100)**2);
    const bmr = (g === "male") ? (10*w)+(6.25*h)-(5*a)+5 : (10*w)+(6.25*h)-(5*a)-161;
    const target = Math.round((bmr * act) - 500);

    document.getElementById('results').style.display = 'block';
    
    // تصنيف الحالة الصحية بناءً على BMI كجزء من النظام الخبير
    let healthNote = (bmi < 18.5) ? "تحتاج لتركيز على المغذيات الكبرى" : 
                     (bmi < 25) ? "حالة مثالية، حافظ على التوازن" : "ركز على المغذيات الصغرى والألياف";

    document.getElementById('stats-summary').innerHTML = `
        <div class="meal-box" style="text-align:center; border:none; background: #2e7d3233;">
            <p>مؤشر الجسم: <strong>${bmi.toFixed(1)}</strong> | الهدف: <strong>${target} سعرة</strong></p>
            <small style="color: #4caf50;">${healthNote}</small>
        </div>
    `;

    const sections = [
        { title: "خيارات الفطور", data: getBestOptions(target * 0.25, "breakfast") },
        { title: "خيارات الغداء", data: getBestOptions(target * 0.45, "lunch") },
        { title: "خيارات العشاء", data: getBestOptions(target * 0.30, "dinner") }
    ];

    let output = "";
    sections.forEach(s => {
        output += `<div class="meal-box"><span class="category-label">${s.title}</span>`;
        s.data.forEach(m => {
            output += `
                <div class="meal-item" style="flex-direction: column; align-items: flex-start;">
                    <div style="display: flex; justify-content: space-between; width: 100%;">
                        <span class="meal-name">${m.name}</span>
                        <span class="meal-cals">${m.cals} سعرة</span>
                    </div>
                    <span style="font-size: 0.75rem; color: #888; margin-top: 4px;">🧪 المغذيات: ${m.vit}</span>
                </div>`;
        });
        output += `</div>`;
    });

    document.getElementById('meal-output').innerHTML = output;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}