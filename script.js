function calculerMoyenne() {
    // مواد علوم تجريبية مع معاملاتها
    const coefficients = {
        math: 7, physique: 6, svt: 5, arabe: 3, anglais: 2, 
        francais: 2, philo: 3, ti: 2, islam: 1
    };

    // جلب النوتات
    const notes = {
        math: parseFloat(document.getElementById('math').value) || 0,
        physique: parseFloat(document.getElementById('physique').value) || 0,
        svt: parseFloat(document.getElementById('svt').value) || 0,
        arabe: parseFloat(document.getElementById('arabe').value) || 0,
        anglais: parseFloat(document.getElementById('anglais').value) || 0,
        francais: parseFloat(document.getElementById('francais').value) || 0,
        philo: parseFloat(document.getElementById('philo').value) || 0,
        ti: parseFloat(document.getElementById('ti').value) || 0,
        islam: parseFloat(document.getElementById('islam').value) || 0
    };

    // حساب المعدل
    let totalPoints = 0;
    let totalCoef = 0;

    for (let matiere in notes) {
        if (matiere in coefficients) {
            totalPoints += notes[matiere] * coefficients[matiere];
            totalCoef += coefficients[matiere];
        }
    }

    const moyenne = totalPoints / totalCoef;
    const moyenneFinale = moyenne.toFixed(2);

    // تحديد الذكرة
    let mention = '';
    let couleur = '';
    
    if (moyenneFinale >= 16) {
        mention = 'ممتاز';
        couleur = '#4CAF50';
    } else if (moyenneFinale >= 14) {
        mention = 'جيد جداً';
        couleur = '#2196F3';
    } else if (moyenneFinale >= 12) {
        mention = 'جيد';
        couleur = '#FF9800';
    } else if (moyenneFinale >= 10) {
        mention = 'مقبول';
        couleur = '#9C27B0';
    } else {
        mention = 'راسب';
        couleur = '#F44336';
    }

    // عرض النتيجة
    afficherResultat(moyenneFinale, mention, couleur);
}

function afficherResultat(moyenne, mention, couleur) {
    const resultat = document.getElementById('resultat');
    
    resultat.innerHTML = `
        <div>المعدل النهائي: <strong>${moyenne}/20</strong></div>
        <div class="mention">${mention}</div>
        <div style="margin-top: 15px; font-size: 1em;">
            ${getConseils(moyenne)}
        </div>
    `;
    
    resultat.style.background = `linear-gradient(135deg, ${couleur}22 0%, ${couleur}44 100%)`;
    resultat.style.display = 'block';
    resultat.scrollIntoView({ behavior: 'smooth' });
}

function getConseils(moyenne) {
    if (moyenne >= 16) return '🎉 تهانينا! معدل ممتاز، نجاح كبير!';
    if (moyenne >= 14) return '👍 جيد جداً، استمر في الاجتهاد!';
    if (moyenne >= 12) return '👌 جيد، حاول تحسين بعض المواد!';
    if (moyenne >= 10) return '✅ مبروك النجاح، ركز على السنة القادمة!';
    return '💪 لا تستسلم، العمل الجاد سيؤتي ثماره!';
}

// إضافة تأثيرات تفاعلية
document.querySelectorAll('.note').forEach(input => {
    input.addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (value > 20) this.value = 20;
        if (value < 0) this.value = 0;
    });
});