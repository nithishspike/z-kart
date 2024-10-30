import Ember from 'ember';


const productImages = {
  'Gaming Laptop Pro': 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/y/x/x/15-fb0147ax-gaming-laptop-hp-original-imahf7yvwdz9jwpp.jpeg?q=70&crop=false',
  'Smart Fridge 2024': 'https://rukminim2.flixcart.com/image/416/416/xif0q/refrigerator-new/h/c/1/-original-imah2gjnkkgrh5xq.jpeg?q=70&crop=false',
  'Ultrabook X': 'https://rukminim2.flixcart.com/image/416/416/kar44280/computer/m/g/3/asus-na-thin-and-light-laptop-original-imafs92skhtaehcq.jpeg?q=70',
  'Smartphone Z': 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/m/x/a/z9-lite-5g-i2306-iqoo-original-imah3fdtbjbvhh55.jpeg?q=70',
  'Headphones Q': 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/m/x/a/z9-lite-5g-i2306-iqoo-original-imah3fdtbjbvhh55.jpeg?q=70',
  'iPhone 15 Pro': 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/m/h/c/-original-imagtc3h9h6kpbkc.jpeg?q=70',
  'iPad Pro': 'https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/a/m/e/-original-imagj72vegwqvkxk.jpeg?q=70',
  'MacBook Pro 16': 'https://rukminim2.flixcart.com/image/312/312/kuyf8nk0/computer/c/8/u/mkgp3hn-a-thin-and-light-laptop-apple-original-imag7yznc5d2rsuh.jpeg?q=70',
  'Apple Watch 9': 'https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/h/c/3/-original-imagte4syszvbmt2.jpeg?q=70',
  'AirPods Pro 2': 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/e/a/f/-original-imagtc44nk4b3hfg.jpeg?q=70',
  'Apple TV 4K': 'https://rukminim2.flixcart.com/image/612/612/xif0q/television/i/j/6/-original-imah4kwn3vv9rgpa.jpeg?q=70',
  'iMac 24': 'https://rukminim2.flixcart.com/image/612/612/xif0q/allinone-desktop/4/n/f/-original-imaguw4jacxcepeb.jpeg?q=70',
  'MacBook Air': 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/m/b/n/-original-imagfdf4xnbyyxpa.jpeg?q=70',
  'iPad Mini': 'https://rukminim2.flixcart.com/image/612/612/ktop5e80/tablet/k/f/r/mlwr3hn-a-apple-original-imag6ygfbepytqcu.jpeg?q=70',
  'AirTag': 'https://rukminim2.flixcart.com/image/612/612/knt7zbk0/smart-tracker/f/0/1/mx532zm-a-apple-original-imag2ffs3exkrsgq.jpeg?q=70',
  'Galaxy S23 Ultra': 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/i/5/1/-original-imagzm8pvabtmeys.jpeg?q=70',
  'Galaxy Z Fold 5': 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/z/j/k/-original-imagztmggmgfdt8d.jpeg?q=70',
  'Galaxy Tab S9': 'https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/8/i/q/-original-imaguyffv34ghmky.jpeg?q=70',
  'Galaxy Watch 6': 'https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/e/z/p/-original-imahfa7xekwfg7cc.jpeg?q=70',
  'Galaxy Buds 3': 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/2/l/s/-original-imah2nhzmmtzthfx.jpeg?q=70',
  'Samsung QLED TV': 'https://rukminim2.flixcart.com/image/312/312/xif0q/television/z/z/s/-original-imagttjpr7vphrks.jpeg?q=70',
  'Odyssey Monitor': 'https://rukminim2.flixcart.com/image/312/312/xif0q/monitor/6/0/0/-original-imagysfvpg8jw4bz.jpeg?q=70',
  'Smart Fridge': 'https://rukminim2.flixcart.com/image/312/312/xif0q/refrigerator-new/t/m/9/-original-imah4c6pbhvgerzn.jpeg?q=70',
  'Galaxy A54': 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/2/a/t/-original-imagnrhknw9pbg3t.jpeg?q=70',
  'Galaxy Tab S6 Lite': 'https://rukminim2.flixcart.com/image/612/612/xif0q/screen-guard/screen-guard/q/o/l/sm-x110-sm-x115-sm-x117-techshield-original-imah4tyhh8aztevq.jpeg?q=70',
  'Oppo Find X6 Pro': 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/3/4/i/-original-imagu8h9snemswmc.jpeg?q=70',
  'Oppo Reno8 Pro': 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/p/v/p/-original-imah3cmbhgfymupr.jpeg?q=70',
  'Oppo F23 Pro 5G': 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/0/n/9/-original-imagzfeavnt7gp5x.jpeg?q=70',
  'Oppo A78 5G': 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/i/s/p/a78-5g-cph2495-oppo-original-imagrwbz6mqddemh.jpeg?q=70',
  'Oppo K10 5G': 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/m/e/3/-original-imah37gwn2xbvzhy.jpeg?q=70',
  'Predator Helios 300': 'https://rukminim2.flixcart.com/image/312/312/ksgehzk0/computer/r/c/k/predator-helios-300-gaming-laptop-acer-original-imag6yjdmwdrksyn.jpeg?q=70',
  'Asus ROG Zephyrus G14': 'https://m.media-amazon.com/images/I/51671b+p4bL.jpg',
  'Dell XPS 13': 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/m/b/n/-original-imagfdf4xnbyyxpa.jpeg?q=70',
  'Lenovo Legion 7': 'https://rukminim2.flixcart.com/image/312/312/kdyus280/computer/t/w/3/lenovo-na-gaming-laptop-original-imafuqwpncg3bzhx.jpeg?q=70',
  'HP Spectre x360': 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/m/b/n/-original-imagfdf4xnbyyxpa.jpeg?q=70',
  'Acer Aspire 5': 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/4/z/v/aspire-5-thin-and-light-laptop-acer-original-imah3gaheyvb6hed.jpeg?q=70',
  'Lenovo Ideapad 3': 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/j/v/a/ideapad-3-thin-and-light-laptop-lenovo-original-imah2f9zfu3zxhrr.jpeg?q=70'
 };

export function productUrl([productName]) {
    
    return productImages[productName];
}

export default Ember.Helper.helper(productUrl);
