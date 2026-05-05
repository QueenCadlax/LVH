import React, { useMemo, useState } from 'react';
import { transportServices, businesses } from '../data/seeds';
import { freightHaulageCompanies, logisticsWarehousingCompanies, courierDeliveryCompanies, privateDriversCompanies, airportTransfersCompanies, shuttleMinibusCompanies, tourSightseeingCompanies, evChargingStations, helicopterCharters } from '../data/transportSeeds';
import { SectionTitle, PrimaryButton } from './Shared';
import { MPUMALANGA_AREAS } from '../types';
import TransportDetail from './TransportDetail';
import TransportCard from './TransportCard';

const AREAS = ['All Areas', ...MPUMALANGA_AREAS];
const RATINGS = ['', '5', '4', '3', '2', '1'];

const TRANSPORT_FILTERS = [
	'Same-Day Delivery',
	'Cross-Border',
	'Refrigerated Transport',
	'Heavy Duty Vehicles',
	'Warehousing Available',
	'Fleet Tracking',
	'Licensed & Insured',
	'24/7 Operations'
];

const SUBCATEGORIES = [
	'FREIGHT & HAULAGE',
	'LOGISTICS & WAREHOUSING',
	'COURIER & DELIVERY SERVICES',
	'PRIVATE DRIVERS & CHAUFFEURS',
	'AIRPORT TRANSFERS',
	'SHUTTLE & MINIBUS SERVICES',
	'TOUR & SIGHTSEEING SERVICES',
	'EV CHARGING STATIONS',
	'HELICOPTER RIDES / CHARTERS'
];

const mapFilterToTag = (f: string) => {
	const key = f.toLowerCase();
	if (key.includes('same')) return 'same-day';
	if (key.includes('cross')) return 'cross-border';
	if (key.includes('refriger')) return 'refrigerated';
	if (key.includes('heavy')) return 'heavy';
	if (key.includes('warehouse')) return 'storage';
	if (key.includes('fleet')) return 'fleet tracking';
	if (key.includes('licensed') || key.includes('insured')) return 'insured';
	if (key.includes('24/7')) return '24/7';
	return f.toLowerCase();
};

const TransportPage: React.FC<{ navigate: (v: string) => void }> = ({ navigate }) => {
	const [area, setArea] = useState('All Areas');
	const [rating, setRating] = useState('');
	const [priceMin, setPriceMin] = useState('');
	const [priceMax, setPriceMax] = useState('');
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [open, setOpen] = useState<any | null>(null);
	const [itemsToShow, setItemsToShow] = useState(9);
	const [searchTerm, setSearchTerm] = useState('');

	const toggleFilter = (f: string) => setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

	const allTransport = useMemo(() => {
		// combine transportServices and transport-focused businesses so featured names are available
		const bizTransport = businesses.filter(b => b.category && String(b.category).toLowerCase().includes('transport'));
		// include seeds from transportSeeds for full coverage of subcategories
		return [
			...transportServices,
			...freightHaulageCompanies,
			...logisticsWarehousingCompanies,
			...courierDeliveryCompanies,
			...privateDriversCompanies,
			...airportTransfersCompanies,
			...shuttleMinibusCompanies,
			...tourSightseeingCompanies,
			...evChargingStations,
			...helicopterCharters,
			...bizTransport,
		];
	}, []);

	const filtered = useMemo(() => {
		return allTransport.filter(s => {
			if (area !== 'All Areas' && s.location && s.location !== area) return false;
			if (rating && Number(s.rating) < Number(rating)) return false;
			if (priceMin || priceMax) {
				const num = Number(String(s.price || s.priceFrom || '').replace(/[^0-9]/g, '')) || 0;
				if (priceMin && num < Number(priceMin)) return false;
				if (priceMax && num > Number(priceMax)) return false;
			}
			if (activeFilters.length > 0) {
				for (const f of activeFilters) {
					const tag = mapFilterToTag(f);
					const tags = (s.tags || []).map((t: string) => String(t).toLowerCase());
					if (!tags.some((t: string) => t.includes(tag))) return false;
				}
			}
			if (searchTerm) {
				const q = searchTerm.toLowerCase();
				const hay = `${s.name || ''} ${s.description || ''} ${s.subcategory || ''} ${s.location || ''}`.toLowerCase();
				if (!hay.includes(q)) return false;
			}
			return true;
		});
	}, [allTransport, area, rating, priceMin, priceMax, activeFilters, searchTerm]);

	const visible = filtered.slice(0, itemsToShow);

	const featuredNames = ['Lowveld Freight Solutions', 'SwiftDrop Couriers', 'Executive Ride Mpumalanga'];
	const featured = featuredNames.map(n => allTransport.find(a => (a.name || '').toLowerCase() === n.toLowerCase())).filter(Boolean as any);

	const resetFilters = () => { setArea('All Areas'); setRating(''); setPriceMin(''); setPriceMax(''); setActiveFilters([]); setSearchTerm(''); };

	return (
		<div className="pt-20 pb-24 container mx-auto px-4">
			{/* Hero */}
			<div className="relative rounded-2xl overflow-hidden mb-6">
				<img src={allTransport[0]?.image} alt="Transport hero" className="w-full h-60 object-cover brightness-75" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
				<div className="absolute left-6 top-8 text-white max-w-2xl">
					<div className="text-xs uppercase font-semibold tracking-wider text-gray-300">IN MPUMALANGA</div>
					<h1 className="text-2xl md:text-3xl font-medium mt-2 leading-tight">Trusted Transport & Logistics Services Across the Lowveld</h1>
					<p className="text-gray-400 text-sm mt-3">Freight, courier, executive transport, warehousing and specialised logistics — verified, insured and operationally ready.</p>
					<div className="mt-4 flex items-center gap-3">
						<PrimaryButton onClick={() => window.scrollTo({ top: 420, behavior: 'smooth' })}>Explore Services</PrimaryButton>
						<div className="text-xs bg-black/40 px-3 py-2 rounded uppercase tracking-widest font-semibold text-gray-300">VERIFIED • INSURED</div>
					</div>
				</div>
			</div>

			{/* Search + Subcategory nav */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
				<div className="flex-1">
					<input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search freight, couriers, drivers or locations…" className="w-full bg-black/20 p-3 rounded-lg text-white text-sm placeholder-gray-500" />
				</div>
				<div className="flex gap-2 overflow-auto mt-3 md:mt-0">
					{SUBCATEGORIES.map(s => (
						<button key={s} onClick={() => setSearchTerm(s)} className="px-2 py-1.5 rounded-lg border border-white/6 text-xs text-gray-300 bg-black/20 hover:border-yellow-400/30 transition whitespace-nowrap font-medium">{s}</button>
					))}
				</div>
			</div>

			{/* Featured carousel */}
			<div className="mb-8">
				<h3 className="text-base text-yellow-400 font-semibold uppercase tracking-wide">Featured Providers</h3>
				<div className="mt-4 flex gap-4 overflow-x-auto py-2">
					{featured.map((f: any) => (
						<div key={f.id} className="min-w-[280px] bg-[#0b0b0b] rounded-xl p-3 border border-white/6">
							<div className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{f.tier || 'PLATINUM'}</div>
							<div className="mt-2 text-base font-medium text-white">{f.name}</div>
							<div className="text-xs text-gray-400 mt-1 line-clamp-1">{f.subcategory || f.description?.split('\n')[0]}</div>
							<div className="mt-2 text-yellow-400 text-sm font-medium">★ {f.rating || '—'} {f.reviewCount ? `(${f.reviewCount})` : ''}</div>
							<div className="mt-3 flex gap-2">
								<button onClick={() => setOpen(f)} className="px-2 py-1.5 rounded text-xs bg-black border border-white/6 text-gray-300 font-medium hover:border-yellow-400/30 transition">Details</button>
								<button onClick={() => window.alert('Request Quote / Book')} className="px-2 py-1.5 rounded text-xs bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition">{String(f.subcategory || '').toLowerCase().includes('courier') ? 'Book' : 'Quote'}</button>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				{/* Filters */}
				<aside className="md:col-span-1 sticky top-28">
					<div className="bg-[#0b0b0b] p-4 rounded-xl border border-white/6">
						<h4 className="text-white font-semibold text-sm mb-4">Filters</h4>

						<label className="text-xs text-gray-400 font-medium block mb-1.5">Location</label>
						<select className="w-full bg-black/40 p-2 rounded text-sm text-white mb-4 border border-white/5 focus:border-yellow-400/30 transition" value={area} onChange={e => setArea(e.target.value)}>
							{AREAS.map(a => <option key={a}>{a}</option>)}
						</select>

						<label className="text-xs text-gray-400 font-medium block mb-1.5">Rating</label>
						<select className="w-full bg-black/40 p-2 rounded text-sm text-white mb-4 border border-white/5 focus:border-yellow-400/30 transition" value={rating} onChange={e => setRating(e.target.value)}>
							{RATINGS.map(r => <option key={r} value={r}>{r === '' ? 'Any' : `${r} & up`}</option>)}
						</select>

						<label className="text-xs text-gray-400 font-medium block mb-1.5">Price Range</label>
						<div className="flex gap-2 mb-4">
							<input placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} className="w-1/2 bg-black/30 p-2 rounded text-sm text-white border border-white/5 focus:border-yellow-400/30 transition" />
							<input placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} className="w-1/2 bg-black/30 p-2 rounded text-sm text-white border border-white/5 focus:border-yellow-400/30 transition" />
						</div>

						<label className="text-xs text-gray-400 font-medium block mb-2">Special Features</label>
						<div className="flex flex-col gap-1.5 mb-4 max-h-40 overflow-y-auto">
							{TRANSPORT_FILTERS.map(f => (
								<label key={f} className="text-xs flex items-center cursor-pointer">
									<input type="checkbox" className="mr-2 w-3 h-3" checked={activeFilters.includes(f)} onChange={() => toggleFilter(f)} /> 
									<span className="text-gray-300">{f}</span>
								</label>
							))}
						</div>

						<div className="flex gap-2">
							<PrimaryButton className="text-xs py-2">Apply</PrimaryButton>
							<button onClick={resetFilters} className="px-3 py-2 rounded-lg border border-white/8 text-xs text-gray-300 font-medium hover:border-yellow-400/30 transition flex-1">Reset</button>
						</div>
					</div>
				</aside>

				{/* Listing grid */}
				<main className="md:col-span-3">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{visible.length > 0 ? visible.map((s: any) => (
							<div key={s.id || s.name} className="h-auto">
								<TransportCard
									service={s}
									onOpen={(svc: any) => setOpen(svc)}
									onBook={(svc: any) => window.alert(`Booking: ${svc.name}`)}
									onContact={(svc: any) => window.open(`https://wa.me/${(svc.provider?.phone || svc.phone || '').toString().replace(/\D/g, '')}`)}
								/>
							</div>
						)) : (
							// Fallback: show curated transport seeds when no results
							transportServices.slice(0, 6).map((s: any) => (
								<div key={s.id} className="h-auto">
									<TransportCard service={s} onOpen={(svc: any) => setOpen(svc)} onBook={(svc: any) => window.alert(`Booking: ${svc.name}`)} onContact={(svc: any) => window.open(`https://wa.me/${(svc.provider?.phone || svc.phone || '').toString().replace(/\D/g, '')}`)} />
								</div>
							))
						)}
					</div>

					<div className="mt-8 text-center">
						{itemsToShow < filtered.length ? (
							<button onClick={() => setItemsToShow(prev => prev + 6)} className="px-6 py-3 rounded-xl bg-black border border-white/8 text-gold-300">Load more</button>
						) : (
							<div className="text-gray-400">No more results</div>
						)}
					</div>
				</main>
			</div>

			{open && <TransportDetail service={open} onClose={() => setOpen(null)} />}
		</div>
	);
}

export default TransportPage;

