const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Freelance', 'Web Designing', 'Price Comparison', 'Sample 5', 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

const savingsStart = '<!-- 5. Today\'s Biggest Savings & Sidebar -->';
const savingsEnd = '<!-- 6. Smart Savings Blog -->';

const startIndex = html.indexOf(savingsStart);
const endIndex = html.indexOf(savingsEnd);

if (startIndex !== -1 && endIndex !== -1) {
    const beforePart = html.substring(0, startIndex);
    const afterPart = html.substring(endIndex);
    const newSavingsSection = `<!-- 5. Today's Biggest Savings & Sidebar -->
            <section class="py-12 text-left">
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center gap-2">
                        <span class="text-orange-500 font-bold text-lg">📈</span>
                        <h2 style="font-family: 'Times New Roman', Times, serif;" class="text-2xl font-bold text-gray-800">Today's Biggest Savings</h2>
                    </div>
                    <a class="text-[#005221] font-bold flex items-center gap-1 group text-sm" href="./pages/categories.html">
                        View All Deals <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
                    </a>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    
                    <!-- Left Smart Saving Banner (lg:col-span-3) -->
                    <div class="lg:col-span-3 bg-[#005221] rounded-3xl p-6 flex flex-col justify-between text-white relative overflow-hidden shadow-md">
                        <!-- campaign/megaphone icon in background -->
                        <div class="absolute right-4 bottom-4 opacity-10">
                            <span class="material-symbols-outlined text-[120px] text-white">campaign</span>
                        </div>
                        <div class="space-y-3 relative z-10">
                            <p class="text-yellow-400 font-black text-sm uppercase tracking-wider">Don't Overpay!</p>
                            <h3 class="text-2xl font-bold leading-tight">Compare First,<br>Save Every Time</h3>
                        </div>
                        <div class="mt-8 relative z-10">
                            <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-md text-sm flex items-center gap-1">
                                Start Comparing <span class="text-lg">→</span>
                            </button>
                        </div>
                    </div>

                    <!-- Right Cards Grid (lg:col-span-9) -->
                    <div class="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        
                        <!-- Card 1: Chicken Biryani -->
                        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#005221] transition-all flex flex-col justify-between">
                            <div class="p-4 flex items-center gap-3">
                                <div class="w-20 h-20 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center">
                                    <img class="w-full h-full object-cover" src="images/categories/food/chicken-biryani.jpg"/>
                                </div>
                                <div class="text-left">
                                    <h4 class="font-extrabold text-sm text-slate-800 leading-tight mb-2">Chicken Biryani</h4>
                                    <div class="space-y-0.5">
                                        <p class="text-[10px] text-slate-400">Lowest Price <span class="text-[#005221] font-black ml-1">Rs. 180</span></p>
                                        <p class="text-[10px] text-slate-400">Highest Price <span class="text-red-500 font-black ml-1">Rs. 320</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-[#005221] py-2 px-4 flex justify-between items-center text-white text-xs font-bold mt-2">
                                <span class="text-[9px] opacity-75 uppercase">You Save</span>
                                <span class="text-white font-extrabold">Rs. 140</span>
                            </div>
                        </div>

                        <!-- Card 2: HP Laptop Charger -->
                        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#005221] transition-all flex flex-col justify-between">
                            <div class="p-4 flex items-center gap-3">
                                <div class="w-20 h-20 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center">
                                    <img class="w-full h-full object-contain p-1" src="images/categories/computers/charger.png"/>
                                </div>
                                <div class="text-left">
                                    <h4 class="font-extrabold text-sm text-slate-800 leading-tight mb-2">HP Laptop Charger</h4>
                                    <div class="space-y-0.5">
                                        <p class="text-[10px] text-slate-400">Lowest Price <span class="text-[#005221] font-black ml-1">Rs. 1,400</span></p>
                                        <p class="text-[10px] text-slate-400">Highest Price <span class="text-red-500 font-black ml-1">Rs. 2,100</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-[#005221] py-2 px-4 flex justify-between items-center text-white text-xs font-bold mt-2">
                                <span class="text-[9px] opacity-75 uppercase">You Save</span>
                                <span class="text-white font-extrabold">Rs. 700</span>
                            </div>
                        </div>

                        <!-- Card 3: Samsung Galaxy A36 -->
                        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#005221] transition-all flex flex-col justify-between">
                            <div class="p-4 flex items-center gap-3">
                                <div class="w-20 h-20 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center">
                                    <img class="w-full h-full object-contain p-1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg92tAvgo8PElqhdjEWlO8T8uDfx0HEe0SVT2rzfg_e0sX5b7CykO_A0pl70_zqVV_kwdfKMChPj-JSLeBaYO5Tdw2y5NwuUS-R_8zT8QErLKsBmPLRc25090D1Lao57cV48tqL3dSN10-OKCNNvug4vJuS3vP-y2RGoSdpDVi9wwmYX9moX2io50byuKyIr-mvm_YCxFLDNiCMD0czlWxP48xKWWW2phBta8g2n8qvTyKagxOcp8sRdVFXx3FgArq-u3a9ey0VJ_g"/>
                                </div>
                                <div class="text-left">
                                    <h4 class="font-extrabold text-sm text-slate-800 leading-tight mb-2">Samsung Galaxy A36</h4>
                                    <div class="space-y-0.5">
                                        <p class="text-[10px] text-slate-400">Lowest Price <span class="text-[#005221] font-black ml-1">Rs. 74,999</span></p>
                                        <p class="text-[10px] text-slate-400">Highest Price <span class="text-red-500 font-black ml-1">Rs. 82,999</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-[#005221] py-2 px-4 flex justify-between items-center text-white text-xs font-bold mt-2">
                                <span class="text-[9px] opacity-75 uppercase">You Save</span>
                                <span class="text-white font-extrabold">Rs. 8,000</span>
                            </div>
                        </div>

                        <!-- Card 4: Cooking Oil -->
                        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#005221] transition-all flex flex-col justify-between">
                            <div class="p-4 flex items-center gap-3">
                                <div class="w-20 h-20 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center">
                                    <img class="w-full h-full object-contain p-1" src="images/categories/grocery/oil.png"/>
                                </div>
                                <div class="text-left">
                                    <h4 class="font-extrabold text-sm text-slate-800 leading-tight mb-2">Cooking Oil 5 Liter</h4>
                                    <div class="space-y-0.5">
                                        <p class="text-[10px] text-slate-400">Lowest Price <span class="text-[#005221] font-black ml-1">Rs. 2,450</span></p>
                                        <p class="text-[10px] text-slate-400">Highest Price <span class="text-red-500 font-black ml-1">Rs. 2,950</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-[#005221] py-2 px-4 flex justify-between items-center text-white text-xs font-bold mt-2">
                                <span class="text-[9px] opacity-75 uppercase">You Save</span>
                                <span class="text-white font-extrabold">Rs. 500</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            
            `;
    fs.writeFileSync(indexHtmlPath, beforePart + newSavingsSection + afterPart, 'utf8');
    console.log('Successfully updated Today\'s Biggest Savings section!');
} else {
    console.log('Target tags not found');
}
