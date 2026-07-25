const captchaA = 3, captchaB = 7;
const dataSample = {
  nama: 'MUHAMMAD ILYAS', nim: '22110001', prodi: 'S1 Ilmu Komputer', jk: 'Laki-laki', agama: 'Islam', hp: '081234567890', email: 'ilyas@email.com', ttl: 'Banjarmasin, 14 Mei 2002', nik: '6371************', ibu: 'SITI AMINAH'
};
const fields = [
  ['Nama Mahasiswa','nama',false],['NIM','nim',false],['Program Studi','prodi',false],['Jenis Kelamin','jk',true],['Agama','agama',true],['Nomor HP','hp',true],['E-Mail','email',true],['Tempat/Tanggal Lahir','ttl',false],['NIK','nik',false],['Nama Ibu Kandung','ibu',false],
];
const el = id => document.getElementById(id);
const loginMsg = el('loginMsg');
const resultMsg = el('resultMsg');
const verificationList = el('verificationList');
const studentInfo = el('studentInfo');
const btnUnduh = el('btnUnduh');
const btnWA = el('btnWA');
const statusPill = el('statusPill');
const declaration = el('declaration');
function normalizeEmail(v){return (v||'').trim().toLowerCase().replace(/\s+/g,'');}
function normalizeHp(v){return (v||'').replace(/\D/g,'');}
function isValidHp(v){return /^0\d{9,14}$/.test(v);} 
function isValidEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);} 
function renderData(){studentInfo.innerHTML=`<div class="item"><div class="item-top"><strong>${dataSample.nama}</strong><span class="tag ok">Data ditemukan</span></div><div class="small muted">${dataSample.nim} • ${dataSample.prodi}</div></div>`; verificationList.innerHTML=''; fields.forEach(([label,key,editable])=>{ const tag = editable ? 'Bisa diperbarui' : 'Sesuai / Tidak Sesuai'; const div = document.createElement('div'); div.className='item'; div.innerHTML=`<div class="item-top"><strong>${label}</strong><span class="tag ${editable?'ok':'no'}">${tag}</span></div><div class="small">${dataSample[key]}</div>`; verificationList.appendChild(div); }); btnUnduh.disabled = !declaration.checked; statusPill.textContent = 'Siap diverifikasi';}
function validateLogin(){ const nim = el('nim').value.trim(); const tgl = el('tglLahir').value; const cap = el('captchaAnswer').value.trim(); if(!nim) return 'NIM wajib diisi.'; if(!tgl) return 'Tanggal lahir wajib diisi.'; if(cap !== String(captchaA + captchaB)) return 'Jawaban verifikasi masih salah.'; return ''; }
el('captchaText').textContent = `${captchaA} + ${captchaB} = ?`;
el('btnTampil').addEventListener('click', ()=>{ const msg = validateLogin(); if(msg){ loginMsg.textContent = msg; loginMsg.style.color='var(--danger)'; return; } loginMsg.textContent='Data berhasil ditemukan.'; loginMsg.style.color='var(--success)'; el('dataCard').classList.remove('hidden'); renderData(); window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'}); });
['editHp','editEmail','editJk','editAgama'].forEach(id=>{ el(id).addEventListener('change', ()=>{ resultMsg.textContent='Perubahan tersimpan di browser sampai nanti dihubungkan ke spreadsheet.'; resultMsg.style.color='var(--primary)'; }); });
declaration.addEventListener('change', ()=>{ btnUnduh.disabled = !declaration.checked; });
el('editHp').addEventListener('input', e=>{ e.target.value = normalizeHp(e.target.value).slice(0,15); });
el('editEmail').addEventListener('input', e=>{ e.target.value = normalizeEmail(e.target.value); });
el('editHp').addEventListener('blur', e=>{ if(e.target.value && !isValidHp(e.target.value)){ resultMsg.textContent='Nomor HP harus angka dan diawali 0.'; resultMsg.style.color='var(--danger)'; } });
el('editEmail').addEventListener('blur', e=>{ if(e.target.value && !isValidEmail(e.target.value)){ resultMsg.textContent='Format e-mail tidak valid.'; resultMsg.style.color='var(--danger)'; } });
btnUnduh.addEventListener('click', ()=>{ resultMsg.textContent='Nanti tombol ini akan mengunduh formulir PDF otomatis.'; resultMsg.style.color='var(--primary)'; });
btnWA.addEventListener('click', ()=>{ window.open('https://wa.me/62895338946122?text=Halo%20Admin%2C%20data%20biodata%20saya%20perlu%20dicek.','_blank'); });
