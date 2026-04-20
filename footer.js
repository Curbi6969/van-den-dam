(function(s) {
  var html = `<footer style="background:#232227;" class="text-slate-100 py-16 px-6">
 <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
 <div class="md:col-span-1">
 <p class="font-headline text-lg font-extrabold text-white mb-4">Van den Dam Schilderwerken</p>
 <p class="font-body text-sm text-slate-300 leading-relaxed mb-6">Het cre\u00ebren van prachtige ruimtes met precisie en passie. Familiebedrijf sinds 1997.</p>
 <p class="font-body text-xs text-slate-400">\u00a9 2026 Van den Dam Schilderwerken.<br/>Alle rechten voorbehouden.</p>
 <p class="font-body text-xs text-slate-500 mt-2">Website gemaakt door <a href="https://nl.linkedin.com/in/beau-nolten-a98a89a7" target="_blank" rel="noopener noreferrer" class="underline hover:text-slate-300 transition-colors">Beau Nolten</a></p>
 </div>
 <div>
 <p class="font-label text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">Navigatie</p>
 <ul class="space-y-2 font-body text-sm">
 <li><a href="diensten.html" class="text-slate-300 hover:text-white transition-colors">Diensten</a></li>
 <li><a href="portfolio.html" class="text-slate-300 hover:text-white transition-colors">Portfolio</a></li>
 <li><a href="over-ons.html" class="text-slate-300 hover:text-white transition-colors">Over Ons</a></li>
 <li><a href="contact.html" class="text-slate-300 hover:text-white transition-colors">Contact</a></li>
 </ul>
 </div>
 <div>
 <p class="font-label text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">Contact</p>
 <ul class="space-y-3 font-body text-sm text-slate-300">
 <li>De Tamboer 4<br/>6921 TD Duiven</li>
 <li><a href="tel:+310316281013" class="hover:text-white transition-colors">0316 281013</a></li>
 <li><a href="mailto:vandendamschilderwerken@live.nl" class="hover:text-white transition-colors break-all">vandendamschilderwerken@live.nl</a></li>
 </ul>
 </div>
 <div>
 <p class="font-label text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">Bedrijfsgegevens</p>
 <ul class="space-y-3 font-body text-sm text-slate-300">
 <li><span class="text-slate-500 text-xs uppercase tracking-wide block mb-0.5">KvK</span>Arnhem nr. 09094924</li>
 <li><span class="text-slate-500 text-xs uppercase tracking-wide block mb-0.5">Rabobank Duiven</span>Rek. nr. 3154 88 980</li>
 </ul>
 <p class="font-label text-xs font-semibold tracking-widest text-slate-500 uppercase mb-2 mt-6">Juridisch</p>
 <ul class="space-y-2 font-body text-sm">
 <li><a href="privacyverklaring.html" class="text-slate-300 hover:text-white transition-colors">Privacyverklaring</a></li>
 </ul>
 </div>
 <div>
 <p class="font-label text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">Erkend Vakbedrijf</p>
 <img src="resources/onderhoudnl-logo.png" alt="OnderhoudNL keurmerk" class="h-16 w-auto mb-4 rounded"/>
 <p class="font-body text-xs text-slate-300 leading-relaxed">Van den Dam is aangesloten bij <a href="https://www.onderhoudnl.nl/over-onderhoudnl" target="_blank" rel="noopener noreferrer" class="text-white underline hover:text-slate-300 transition-colors">OnderhoudNL (FOSAG)</a> de branchevereniging voor erkende schilders- en afwerkingsbedrijven.</p>
 </div>
 </div>
</footer>`;
  if (s) { s.insertAdjacentHTML('beforebegin', html); s.remove(); }
  else document.body.insertAdjacentHTML('beforeend', html);
})(document.currentScript);
