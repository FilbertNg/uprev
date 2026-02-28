"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState, useCallback } from "react";
import {
    LayoutDashboard, Users, GitBranch, Contact, CalendarCheck,
    Rocket, BarChart3, Settings, AlertTriangle, CheckSquare, Bell
} from "lucide-react";

const NAV_ITEMS = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "leads", label: "Leads", icon: Users },
    { key: "pipeline", label: "Pipeline", icon: GitBranch },
    { key: "contacts", label: "Contacts", icon: Contact },
    { key: "tasks", label: "Tasks", icon: CalendarCheck },
    { key: "campaigns", label: "Campaigns", icon: Rocket },
    { key: "reports", label: "Reports", icon: BarChart3 },
    { key: "settings", label: "Settings", icon: Settings },
];

/* ─── Page Content Components ─── */

function DashboardPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div className="text-[14px] font-display text-white font-semibold">Command Center</div>
                <div className="px-2 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[9px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Live
                </div>
            </div>
            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                {[
                    { label: "Pipeline Value", value: "Rp 2.4B", change: "↑ 12.3%", color: "text-green-400" },
                    { label: "Forecast", value: "Rp 1.8B", change: "weighted", color: "text-[#FF5722]" },
                    { label: "Win Rate", value: "34.2%", change: "↑ 5.1%", color: "text-green-400", valueColor: "text-[#FF5722]" },
                    { label: "Avg Cycle", value: "18d", change: "↓ 3 days", color: "text-green-400" },
                ].map((kpi, i) => (
                    <div key={i} className="bg-[#222] p-2.5 rounded-lg border border-[#333]">
                        <div className="text-[#A3A3A3] text-[9px] mb-0.5">{kpi.label}</div>
                        <div className={`text-[16px] ${kpi.valueColor || 'text-white'} font-mono font-bold`}>{kpi.value}</div>
                        <div className={`text-[8px] ${kpi.color} mt-0.5`}>{kpi.change}</div>
                    </div>
                ))}
            </div>
            {/* Charts — 3 columns: funnel, sources, gauge */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                <div className="bg-[#222] p-3 rounded-lg border border-[#333] flex flex-col">
                    <div className="text-[9px] text-[#A3A3A3] mb-2 font-semibold">Sales Funnel</div>
                    <div className="flex flex-col justify-center gap-1.5">
                        {[
                            { label: "New Lead · 248", w: "100%", o: "bg-[#FF5722]/80" },
                            { label: "Qualified · 186", w: "75%", o: "bg-[#FF5722]/60" },
                            { label: "Proposal · 84", w: "50%", o: "bg-[#FF5722]/40" },
                            { label: "Closed · 42", w: "28%", o: "bg-[#FF5722]" },
                        ].map((s, i) => (
                            <div key={i} className={`h-5.5 ${s.o} rounded text-[8px] text-white flex items-center px-2`} style={{ width: s.w }}>{s.label}</div>
                        ))}
                    </div>
                </div>
                <div className="bg-[#222] p-3 rounded-lg border border-[#333] flex flex-col">
                    <div className="text-[9px] text-[#A3A3A3] mb-2 font-semibold">Lead Sources</div>
                    <div className="flex flex-col justify-center gap-2">
                        {[
                            { label: "Digital Ads", pct: "45%", color: "bg-[#FF5722]" },
                            { label: "Referrals", pct: "28%", color: "bg-[#FFB74D]" },
                            { label: "Cold Outreach", pct: "18%", color: "bg-[#90CAF9]" },
                            { label: "Organic", pct: "9%", color: "bg-[#4CAF50]" },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                <div className="text-[8px] text-[#A3A3A3] w-16 shrink-0">{s.label}</div>
                                <div className="flex-1 h-3 bg-[#333] rounded-full overflow-hidden">
                                    <div className={`h-full ${s.color} rounded-full`} style={{ width: s.pct }}></div>
                                </div>
                                <span className="text-[8px] text-white font-mono w-6 text-right">{s.pct}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[#222] p-3 rounded-lg border border-[#333] flex flex-col">
                    <div className="text-[10px] text-[#A3A3A3] mb-2 self-start font-semibold">Revenue vs Goal</div>
                    <div className="flex flex-col items-center justify-center">
                        <svg viewBox="0 0 80 50" className="w-[100px]">
                            <path d="M 10 45 A 30 30 0 0 1 70 45" fill="none" stroke="#333" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 10 45 A 30 30 0 0 1 70 45" fill="none" stroke="#FF5722" strokeWidth="6" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="26.4" />
                        </svg>
                        <div className="text-[18px] text-[#FF5722] font-mono font-bold -mt-2">72%</div>
                        <div className="text-[9px] text-[#A3A3A3] mt-0.5">Rp 1.73B / Rp 2.4B</div>
                    </div>
                </div>
            </div>
            {/* Bottom row — fills remaining space */}
            <div className="grid grid-cols-3 gap-2 flex-1 min-h-0">
                <div className="bg-[#222] p-2 rounded-lg border border-[#333] flex flex-col">
                    <div className="text-[9px] text-red-400 font-semibold mb-1"><AlertTriangle size={8} className="inline mr-0.5" />Stale Deals</div>
                    <div className="flex-1 space-y-1 text-[9px]">
                        <div className="flex justify-between"><span className="text-[#A3A3A3]">Hotel Majapahit</span><span className="text-red-400">5d</span></div>
                        <div className="flex justify-between"><span className="text-[#A3A3A3]">PT Sinar Jaya</span><span className="text-red-400">3d</span></div>
                        <div className="flex justify-between"><span className="text-[#A3A3A3]">Villa Seminyak</span><span className="text-red-400">4d</span></div>
                        <div className="flex justify-between"><span className="text-[#A3A3A3]">Resort Raja Ampat</span><span className="text-red-400">7d</span></div>
                        <div className="flex justify-between"><span className="text-[#A3A3A3]">PT Global Indo</span><span className="text-red-400">2d</span></div>
                    </div>
                </div>
                <div className="bg-[#222] p-2 rounded-lg border border-[#333] flex flex-col">
                    <div className="text-[9px] text-[#FFB74D] font-semibold mb-1"><CheckSquare size={8} className="inline mr-0.5" />Tasks Due</div>
                    <div className="flex-1 space-y-1 text-[9px]">
                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm border border-[#FFB74D]/50 shrink-0"></div><span className="text-[#A3A3A3]">Call Mrs. Dewi</span></div>
                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm border border-[#FFB74D]/50 shrink-0"></div><span className="text-[#A3A3A3]">Proposal Budi</span></div>
                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#4CAF50] border-[#4CAF50] shrink-0"></div><span className="text-[#A3A3A3] line-through">Update CRM data</span></div>
                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm border border-[#FFB74D]/50 shrink-0"></div><span className="text-[#A3A3A3]">Demo Hotel Bali</span></div>
                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-[#4CAF50] border-[#4CAF50] shrink-0"></div><span className="text-[#A3A3A3] line-through">Invoice Resort</span></div>
                    </div>
                </div>
                <div className="bg-[#222] p-2 rounded-lg border border-[#333] flex flex-col">
                    <div className="text-[9px] text-green-400 font-semibold mb-1"><Bell size={8} className="inline mr-0.5" />Activity</div>
                    <div className="flex-1 space-y-1 text-[9px]">
                        <div className="text-[#A3A3A3]"><span className="text-green-400">●</span> Proposal opened</div>
                        <div className="text-[#A3A3A3]"><span className="text-[#FF5722]">●</span> New lead: Website</div>
                        <div className="text-[#A3A3A3]"><span className="text-[#90CAF9]">●</span> Payment received</div>
                        <div className="text-[#A3A3A3]"><span className="text-[#FFB74D]">●</span> Follow-up scheduled</div>
                        <div className="text-[#A3A3A3]"><span className="text-green-400">●</span> Deal closed: Bintan</div>
                    </div>
                </div>
            </div>
        </>
    );
}

function LeadsPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-3">
                <div className="text-[14px] font-display text-white font-semibold">Leads & Prospects</div>
                <div className="flex gap-1">
                    <div className="px-2 py-0.5 bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20 rounded text-[8px] cursor-pointer hover:bg-[#FF5722]/20">+ Add</div>
                    <div className="px-2 py-0.5 bg-[#333] text-[#A3A3A3] rounded text-[8px] cursor-pointer hover:bg-[#444]">✎ Edit</div>
                    <div className="px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[8px] cursor-pointer hover:bg-red-500/20">✕ Del</div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                <div className="bg-[#222] p-3 rounded-lg border border-[#333]">
                    <div className="text-[9px] text-[#A3A3A3] mb-1">Total Leads</div>
                    <div className="text-[18px] text-white font-mono font-bold">1,247</div>
                </div>
                <div className="bg-[#222] p-3 rounded-lg border border-[#333]">
                    <div className="text-[9px] text-[#A3A3A3] mb-1">New Today</div>
                    <div className="text-[18px] text-[#FF5722] font-mono font-bold">+38</div>
                </div>
                <div className="bg-[#222] p-3 rounded-lg border border-[#333]">
                    <div className="text-[9px] text-[#A3A3A3] mb-1">Avg Score</div>
                    <div className="text-[18px] text-[#4CAF50] font-mono font-bold">72</div>
                </div>
            </div>
            {/* Lead List */}
            <div className="flex-1 bg-[#222] rounded-lg border border-[#333] overflow-hidden flex flex-col">
                <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-[#1A1A1A] border-b border-[#333] text-[9px] text-[#A3A3A3] font-semibold">
                    <span>Name</span><span>Source</span><span>Score</span><span>Status</span>
                </div>
                {[
                    { name: "Ahmad Rizky", source: "Website", score: 92, status: "Hot" },
                    { name: "Dewi Sartika", source: "Referral", score: 85, status: "Hot" },
                    { name: "PT Maju Jaya", source: "LinkedIn", score: 67, status: "Warm" },
                    { name: "Budi Santoso", source: "Cold Email", score: 45, status: "Cold" },
                    { name: "Siti Nurhaliza", source: "Ads", score: 78, status: "Warm" },
                    { name: "Rina Wijaya", source: "Referral", score: 91, status: "Hot" },
                    { name: "Hendra Gunawan", source: "Website", score: 55, status: "Cold" },
                    { name: "PT Karya Indo", source: "LinkedIn", score: 73, status: "Warm" },
                    { name: "Maya Putri", source: "Ads", score: 88, status: "Hot" },
                    { name: "PT Suramadu", source: "Website", score: 77, status: "Warm" },
                    { name: "PT Sinar Jaya", source: "Website", score: 45, status: "Cold" },
                    { name: "PT Sabar Jaya", source: "Referral", score: 49, status: "Cold" },
                    { name: "Padel Court Diastana", source: "Website", score: 90, status: "Hot" },
                ].map((lead, i) => (
                    <div key={i} className="grid grid-cols-4 gap-2 px-3 py-1.5 text-[9px] border-b border-[#333]/50 hover:bg-white/5">
                        <span className="text-white">{lead.name}</span>
                        <span className="text-[#A3A3A3]">{lead.source}</span>
                        <span className={`font-mono ${lead.score > 80 ? 'text-[#4CAF50]' : lead.score > 60 ? 'text-[#FFB74D]' : 'text-[#A3A3A3]'}`}>{lead.score}</span>
                        <span className={`${lead.status === 'Hot' ? 'text-[#FF5722]' : lead.status === 'Warm' ? 'text-[#FFB74D]' : 'text-[#A3A3A3]'}`}>{lead.status}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

function PipelinePage() {
    return (
        <>
            <div className="flex justify-between items-center mb-3">
                <div className="text-[14px] font-display text-white font-semibold">Pipeline / Deals</div>
                <div className="flex gap-1">
                    <div className="px-2 py-0.5 bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20 rounded text-[8px] cursor-pointer hover:bg-[#FF5722]/20">+ Add Deal</div>
                    <div className="px-2 py-0.5 bg-[#333] text-[#A3A3A3] rounded text-[8px] cursor-pointer hover:bg-[#444]">✎ Edit</div>
                </div>
            </div>
            {/* Kanban columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 min-h-0">
                {[
                    { stage: "Discovery", deals: [{ name: "Hotel Bali", val: "Rp 120M" }, { name: "Resort Lombok", val: "Rp 85M" }, { name: "Cafe Kopi", val: "Rp 45M" }], color: "border-[#90CAF9]" },
                    { stage: "Proposal", deals: [{ name: "PT Nusantara", val: "Rp 250M" }, { name: "Hotel Surabaya", val: "Rp 175M" }, { name: "Spa Retreat", val: "Rp 60M" }], color: "border-[#FFB74D]" },
                    { stage: "Negotiation", deals: [{ name: "Villa Ubud", val: "Rp 180M" }, { name: "Hotel Jogja", val: "Rp 95M" }, { name: "PT Indo Travel", val: "Rp 310M" }], color: "border-[#FF5722]" },
                    { stage: "Closed Won", deals: [{ name: "Resort Bintan", val: "Rp 320M" }, { name: "Hotel Bandung", val: "Rp 145M" }], color: "border-[#4CAF50]" },
                ].map((col, i) => (
                    <div key={i} className="bg-[#222] rounded-lg border border-[#333] p-2 flex flex-col">
                        <div className={`text-[9px] font-semibold text-white mb-2 pb-1.5 border-b-2 ${col.color}`}>{col.stage}</div>
                        <div className="flex-1 space-y-1.5">
                            {col.deals.map((d, j) => (
                                <div key={j} className="bg-[#1A1A1A] p-2 rounded border border-[#333]/50">
                                    <div className="text-[9px] text-white font-medium">{d.name}</div>
                                    <div className="text-[9px] text-[#FF5722] font-mono mt-0.5">{d.val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function ContactsPage() {
    return (
        <>
            <div className="text-[14px] font-display text-white font-semibold mb-3">Contacts / Accounts</div>
            <div className="flex-1 bg-[#222] rounded-lg border border-[#333] overflow-hidden flex flex-col">
                <div className="grid grid-cols-5 gap-2 px-3 py-2 bg-[#1A1A1A] border-b border-[#333] text-[9px] text-[#A3A3A3] font-semibold">
                    <span>Contact</span><span>Company</span><span>Phone</span><span>Sentiment</span><span>Last Interacted</span>
                </div>
                {[
                    { name: "Ahmad R.", company: "PT Maju", phone: "+62 812-xxx", mood: "😊 Positive", last: "2h ago" },
                    { name: "Dewi S.", company: "Hotel Bali", phone: "+62 821-xxx", mood: "😐 Neutral", last: "1d ago" },
                    { name: "Budi K.", company: "Villa Ubud", phone: "+62 857-xxx", mood: "😊 Positive", last: "3h ago" },
                    { name: "Siti N.", company: "Resort Lombok", phone: "+62 813-xxx", mood: "😠 Negative", last: "5d ago" },
                    { name: "Rudi H.", company: "PT Nusantara", phone: "+62 878-xxx", mood: "😊 Positive", last: "12h ago" },
                    { name: "Rina W.", company: "Cafe Kopi", phone: "+62 856-xxx", mood: "😊 Positive", last: "6h ago" },
                    { name: "Hendra G.", company: "Spa Retreat", phone: "+62 819-xxx", mood: "😐 Neutral", last: "2d ago" },
                    { name: "Maya P.", company: "Hotel Bandung", phone: "+62 822-xxx", mood: "😊 Positive", last: "1h ago" },
                ].map((c, i) => (
                    <div key={i} className="grid grid-cols-5 gap-2 px-3 py-1.5 text-[9px] border-b border-[#333]/50 hover:bg-white/5">
                        <span className="text-white">{c.name}</span>
                        <span className="text-[#A3A3A3]">{c.company}</span>
                        <span className="text-[#A3A3A3] font-mono">{c.phone}</span>
                        <span>{c.mood}</span>
                        <span className="text-[#A3A3A3]">{c.last}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

function TasksPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-3">
                <div className="text-[14px] font-display text-white font-semibold">Tasks & Calendar</div>
                <div className="flex gap-1">
                    <div className="px-2 py-0.5 bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20 rounded text-[8px] cursor-pointer hover:bg-[#FF5722]/20">+ Add Task</div>
                    <div className="px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[8px] cursor-pointer hover:bg-red-500/20">✕ Clear Done</div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 min-h-0">
                {/* Today's Tasks */}
                <div className="bg-[#222] p-3 rounded-lg border border-[#333] flex flex-col">
                    <div className="text-[9px] text-[#FFB74D] font-semibold mb-2 flex items-center gap-1"><CalendarCheck size={10} /> Today&apos;s Tasks</div>
                    <div className="flex-1 space-y-2">
                        {[
                            { task: "Call back Mrs. Dewi — follow up pricing", done: false },
                            { task: "Send revised proposal to PT Nusantara", done: false },
                            { task: "Schedule demo with Hotel Bali team", done: true },
                            { task: "Review contract terms for Villa Ubud", done: false },
                            { task: "Update lead scores in CRM", done: true },
                            { task: "Prepare Q1 sales report", done: false },
                            { task: "Follow up Resort Bintan invoice", done: true },
                        ].map((t, i) => (
                            <div key={i} className="flex items-center gap-2 text-[9px]">
                                <div className={`w-3 h-3 rounded border ${t.done ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-[#FFB74D]/50'} flex items-center justify-center shrink-0`}>
                                    {t.done && <span className="text-white text-[6px]">✓</span>}
                                </div>
                                <span className={`${t.done ? 'text-[#A3A3A3] line-through' : 'text-white'}`}>{t.task}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Upcoming */}
                <div className="bg-[#222] p-3 rounded-lg border border-[#333] flex flex-col">
                    <div className="text-[9px] text-[#90CAF9] font-semibold mb-2 flex items-center gap-1"><Bell size={10} /> Upcoming Schedule</div>
                    <div className="flex-1 space-y-2">
                        {[
                            { time: "09:00", event: "Morning briefing", type: "Meeting" },
                            { time: "10:00", event: "Team standup", type: "Meeting" },
                            { time: "11:30", event: "Demo with PT Maju", type: "Call" },
                            { time: "14:00", event: "Contract review", type: "Task" },
                            { time: "15:30", event: "Webinar prep", type: "Task" },
                            { time: "16:00", event: "Client dinner prep", type: "Reminder" },
                        ].map((e, i) => (
                            <div key={i} className="flex items-center gap-2 text-[9px]">
                                <span className="text-[#FF5722] font-mono w-8 shrink-0">{e.time}</span>
                                <span className="text-white flex-1">{e.event}</span>
                                <span className="text-[#A3A3A3] text-[8px] bg-[#333] px-1.5 py-0.5 rounded">{e.type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function CampaignsPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-3">
                <div className="text-[14px] font-display text-white font-semibold">Campaigns & Automations</div>
                <div className="flex gap-1">
                    <div className="px-2 py-0.5 bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20 rounded text-[8px] cursor-pointer hover:bg-[#FF5722]/20">+ New</div>
                    <div className="px-2 py-0.5 bg-[#333] text-[#A3A3A3] rounded text-[8px] cursor-pointer hover:bg-[#444]">✎ Edit</div>
                </div>
            </div>
            <div className="flex-1 bg-[#222] rounded-lg border border-[#333] overflow-hidden flex flex-col">
                <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-[#1A1A1A] border-b border-[#333] text-[9px] text-[#A3A3A3] font-semibold">
                    <span>Campaign</span><span>Type</span><span>Status</span><span>Performance</span>
                </div>
                {[
                    { name: "Summer Promo Blast", type: "Email", status: "Active", perf: "32% open rate" },
                    { name: "Re-engage Cold Leads", type: "AI Sequence", status: "Active", perf: "18% reply rate" },
                    { name: "Birthday Vouchers", type: "WhatsApp", status: "Scheduled", perf: "—" },
                    { name: "New Year Campaign", type: "Multi-channel", status: "Draft", perf: "—" },
                    { name: "Referral Reward", type: "Email", status: "Active", perf: "24% conversion" },
                    { name: "Flash Sale Weekend", type: "SMS", status: "Active", perf: "41% CTR" },
                    { name: "Win-back Q4 Leads", type: "AI Sequence", status: "Paused", perf: "12% reply" },
                    { name: "Valentine Special", type: "WhatsApp", status: "Completed", perf: "38% conversion" },
                ].map((c, i) => (
                    <div key={i} className="grid grid-cols-4 gap-2 px-3 py-1.5 text-[9px] border-b border-[#333]/50 hover:bg-white/5">
                        <span className="text-white">{c.name}</span>
                        <span className="text-[#A3A3A3]">{c.type}</span>
                        <span className={`${c.status === 'Active' ? 'text-[#4CAF50]' : c.status === 'Scheduled' ? 'text-[#FFB74D]' : c.status === 'Completed' ? 'text-[#90CAF9]' : c.status === 'Paused' ? 'text-red-400' : 'text-[#A3A3A3]'}`}>{c.status}</span>
                        <span className="text-[#A3A3A3] font-mono">{c.perf}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

function ReportsPage() {
    return (
        <>
            <div className="text-[14px] font-display text-white font-semibold mb-2">Reports & Analytics</div>
            {/* 5 KPIs */}
            <div className="grid grid-cols-5 gap-1.5 mb-2">
                {[
                    { label: "Revenue MTD", value: "Rp 1.73B", color: "text-[#FF5722]" },
                    { label: "Conversion", value: "34.2%", color: "text-[#4CAF50]" },
                    { label: "Avg Deal", value: "Rp 85M", color: "text-white" },
                    { label: "ROI", value: "4.2x", color: "text-[#FFB74D]" },
                    { label: "CAC", value: "Rp 2.1M", color: "text-[#90CAF9]" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#222] p-2 rounded-lg border border-[#333]">
                        <div className="text-[8px] text-[#A3A3A3]">{k.label}</div>
                        <div className={`text-[15px] ${k.color} font-mono font-bold`}>{k.value}</div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
                {/* Revenue Chart */}
                <div className="bg-[#222] p-3 rounded-lg border border-[#333] flex flex-col">
                    <div className="text-[10px] text-[#A3A3A3] mb-2 font-semibold">Revenue Trend (6mo)</div>
                    <div className="flex-1 flex items-end gap-1.5 pb-1">
                        {[
                            { px: 100, label: "Jul", val: "680M" },
                            { px: 120, label: "Aug", val: "935M" },
                            { px: 110, label: "Sep", val: "816M" },
                            { px: 140, label: "Oct", val: "1.1B" },
                            { px: 160, label: "Nov", val: "1.2B" },
                            { px: 190, label: "Dec", val: "1.5B" },
                        ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5">
                                <span className="text-[7px] text-[#FF5722] font-mono">{bar.val}</span>
                                <div className="w-full rounded-t" style={{ height: `${bar.px}px`, background: 'linear-gradient(to top, #FF5722, rgba(255,87,34,0.3))' }}></div>
                                <span className="text-[8px] text-[#A3A3A3]">{bar.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Conversion Funnel */}
                <div className="bg-[#222] p-3 rounded-lg border border-[#333] flex flex-col">
                    <div className="text-[10px] text-[#A3A3A3] mb-2 font-semibold">Conversion Funnel</div>
                    <div className="flex-1 flex flex-col justify-center gap-2">
                        {[
                            { stage: "Website Visit", count: "12,450", w: "100%", c: "bg-[#333]" },
                            { stage: "Lead Captured", count: "1,247", w: "45%", c: "bg-[#FF5722]/60" },
                            { stage: "Qualified", count: "426", w: "25%", c: "bg-[#FF5722]/80" },
                            { stage: "Closed Won", count: "146", w: "12%", c: "bg-[#4CAF50]" },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-[9px] mb-0.5">
                                    <span className="text-[#A3A3A3]">{s.stage}</span>
                                    <span className="text-white font-mono">{s.count}</span>
                                </div>
                                <div className={`h-5 ${s.c} rounded`} style={{ width: s.w }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Top Performers */}
            <div className="bg-[#222] p-2 rounded-lg border border-[#333] mt-2">
                <div className="text-[9px] text-[#A3A3A3] font-semibold mb-1">Top Performers</div>
                <div className="grid grid-cols-3 gap-2 text-[8px]">
                    <div className="flex items-center gap-1"><span className="text-[#FFB74D]">🥇</span><span className="text-white">Rina W.</span><span className="text-[#4CAF50] font-mono ml-auto">Rp 420M</span></div>
                    <div className="flex items-center gap-1"><span className="text-[#A3A3A3]">🥈</span><span className="text-white">Ahmad R.</span><span className="text-[#4CAF50] font-mono ml-auto">Rp 385M</span></div>
                    <div className="flex items-center gap-1"><span className="text-[#FF5722]">🥉</span><span className="text-white">Dewi S.</span><span className="text-[#4CAF50] font-mono ml-auto">Rp 310M</span></div>
                </div>
            </div>
        </>
    );
}

function SettingsPage() {
    return (
        <>
            <div className="text-[14px] font-display text-white font-semibold mb-3">Settings</div>
            <div className="flex-1 overflow-hidden flex flex-col gap-0">
                {/* General Section */}
                <div className="border-b border-[#333] pb-2 mb-2">
                    <div className="text-[9px] text-[#A3A3A3] uppercase tracking-wider mb-2">General</div>
                    {[
                        { label: "Company Name", value: "UpRev Agency" },
                        { label: "Timezone", value: "Asia/Jakarta (GMT+7)" },
                        { label: "Language", value: "Bahasa Indonesia" },
                        { label: "Currency", value: "IDR (Rp)" },
                    ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between py-1 text-[9px]">
                            <span className="text-[#A3A3A3]">{s.label}</span>
                            <span className="text-white font-mono bg-[#222] px-2 py-0.5 rounded border border-[#333]">{s.value}</span>
                        </div>
                    ))}
                </div>
                {/* Integrations Section */}
                <div className="border-b border-[#333] pb-2 mb-2">
                    <div className="text-[9px] text-[#A3A3A3] uppercase tracking-wider mb-2">Integrations</div>
                    {[
                        { name: "Gmail", status: true },
                        { name: "WhatsApp Business", status: true },
                        { name: "LinkedIn Sales Nav", status: true },
                        { name: "Stripe Payments", status: false },
                        { name: "Zapier", status: false },
                    ].map((int, i) => (
                        <div key={i} className="flex items-center justify-between py-1 text-[9px]">
                            <span className="text-white">{int.name}</span>
                            <div className={`w-7 h-3.5 rounded-full flex items-center px-0.5 ${int.status ? 'bg-[#4CAF50]' : 'bg-[#333]'}`}>
                                <div className={`w-2.5 h-2.5 rounded-full bg-white transition-transform ${int.status ? 'translate-x-3' : ''}`}></div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Account Section */}
                <div>
                    <div className="text-[9px] text-[#A3A3A3] uppercase tracking-wider mb-2">Account</div>
                    {[
                        { label: "Plan", value: "Enterprise", color: "text-[#FF5722]" },
                        { label: "Users", value: "12 / 20", color: "text-white" },
                        { label: "Storage", value: "45 GB / 100 GB", color: "text-white" },
                        { label: "API Calls", value: "8,420 / 50,000", color: "text-white" },
                    ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between py-1 text-[9px]">
                            <span className="text-[#A3A3A3]">{s.label}</span>
                            <span className={`${s.color} font-mono`}>{s.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

const PAGE_COMPONENTS: Record<string, React.FC> = {
    dashboard: DashboardPage,
    leads: LeadsPage,
    pipeline: PipelinePage,
    contacts: ContactsPage,
    tasks: TasksPage,
    campaigns: CampaignsPage,
    reports: ReportsPage,
    settings: SettingsPage,
};

/* ─── Main Hero Component ─── */

export function CrmHero() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLElement>(null);
    const [activeNav, setActiveNav] = useState(0);

    // Click handler — cycles to next nav item
    const handleDashboardClick = useCallback(() => {
        setActiveNav((prev) => (prev + 1) % NAV_ITEMS.length);
    }, []);

    // Track scroll progress for 3D layered wireframe merge
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Layer 1: Background grid layer
    const yLayer1 = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
    const opacityLayer1 = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.8]);

    // Layer 2: Mid wireframe layer
    const yLayer2 = useTransform(scrollYProgress, [0, 1], ["-5%", "10%"]);
    const opacityLayer2 = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.9]);

    // Layer 3: Solid Top UI
    const yLayer3 = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
    const scaleLayer3 = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
    const blurLayer3 = useTransform(scrollYProgress, [0, 0.3], ["4px", "0px"]);

    const ActivePage = PAGE_COMPONENTS[NAV_ITEMS[activeNav].key];

    return (
        <section ref={containerRef} className="relative min-h-[120vh] flex flex-col items-center pt-32 pb-40 px-4 sm:px-6 bg-[#0A0A0A] overflow-hidden">
            {/* Title */}
            <div className="max-w-[800px] w-full mx-auto text-center z-20 relative mb-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-display text-[48px] md:text-[64px] font-extrabold text-[#F5F5F5] leading-tight mb-6"
                >
                    <span className="bg-gradient-to-r from-[var(--color-tiger-flame)] to-[#FF8A65] bg-clip-text text-transparent">Data-Driven</span>{" "}
                    {t("Control.", "Control.")}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-inter text-[18px] text-[#A3A3A3] max-w-[700px] mx-auto leading-relaxed"
                >
                    {t(
                        "Kuasai Data Anda, Kuasai Pasar Anda. Tampilan depan yang cantik percuma jika sistem belakang rapuh. UpRev menyediakan Dashboard Terpusat untuk memantau inventaris dan database pelanggan secara real-time.",
                        "Master Your Data, Master Your Market. A beautiful storefront is useless if the backend is fragile. UpRev provides a Centralized Dashboard to monitor inventory and customer databases in real-time."
                    )}
                </motion.p>
            </div>

            {/* Click hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-center mb-10 z-20 relative"
            >
                <span className="inline-flex items-center gap-2 text-[13px] text-[#A3A3A3] bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse"></span>
                    {t("Klik untuk menjelajahi dashboard", "Click to explore the dashboard")}
                </span>
            </motion.div>

            {/* Sticky Container — Phone on mobile, Tablet on desktop */}
            <div className="sticky top-32 w-full max-w-[380px] md:max-w-[1000px] mx-auto aspect-[9/16] md:aspect-[16/9] perspective-[1000px] z-10 flex items-center justify-center">
                <motion.div
                    style={{
                        rotateX: useTransform(scrollYProgress, [0, 0.5], [20, 0]),
                        rotateZ: useTransform(scrollYProgress, [0, 0.5], [-5, 0]),
                        translateY: useTransform(scrollYProgress, [0, 0.5], [0, -50])
                    }}
                    className="relative w-full h-full preserve-3d"
                >
                    {/* Layer 1: Bottom Wireframe */}
                    <motion.div
                        style={{ y: yLayer1, opacity: opacityLayer1, translateZ: "-200px" }}
                        className="absolute inset-0 bg-[#0A0A0A] border-2 border-[#FF5722]/20 rounded-2xl shadow-[0_0_50px_rgba(255,87,34,0.1)] flex items-center justify-center overflow-hidden"
                    >
                        <div className="w-full h-full bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />
                    </motion.div>

                    {/* Layer 2: Mid structural elements */}
                    <motion.div
                        style={{ y: yLayer2, opacity: opacityLayer2, translateZ: "-100px" }}
                        className="absolute inset-[5%] border border-white/10 bg-white/[0.02] rounded-xl flex shadow-2xl backdrop-blur-[2px]"
                    >
                        <div className="w-[200px] h-full border-r border-white/10 p-4">
                            <div className="h-6 w-3/4 bg-white/5 rounded mb-6"></div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 w-full bg-white/5 rounded"></div>)}
                            </div>
                        </div>
                        <div className="flex-1 p-6">
                            <div className="h-10 w-1/3 bg-white/5 rounded mb-8"></div>
                            <div className="flex gap-4 mb-8">
                                {[1, 2, 3].map(i => <div key={i} className="h-24 flex-1 bg-white/5 rounded-lg border border-white/5"></div>)}
                            </div>
                        </div>
                    </motion.div>

                    {/* Layer 3: Top Solid UI — Interactive CRM Dashboard */}
                    <motion.div
                        style={{ y: yLayer3, scale: scaleLayer3, filter: blurLayer3, translateZ: "0px" }}
                        className="absolute inset-[2%] bg-[#1A1A1A] border border-[#333333] rounded-xl shadow-2xl overflow-hidden flex flex-col cursor-pointer"
                        onClick={handleDashboardClick}
                    >
                        {/* Top Bar */}
                        <div className="h-7 md:h-10 border-b border-[#333333] flex items-center px-2 md:px-4 justify-between bg-[#111111] shrink-0">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/80"></div>
                                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500/80"></div>
                                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="text-[8px] md:text-[10px] text-[#A3A3A3] font-mono">dashboard.uprev.id</div>
                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#333333]"></div>
                        </div>

                        {/* Dashboard Body */}
                        <div className="flex flex-1 overflow-hidden">
                            {/* Sidebar — hidden on phone, visible on tablet+ */}
                            <div className="hidden md:flex w-[130px] border-r border-[#333333] py-3 px-2 bg-[#111111] shrink-0 flex-col">
                                <div className="text-[#FF5722] font-display font-bold text-[12px] mb-3 px-2">UpRev CRM</div>
                                <div className="space-y-0.5 text-[9px]">
                                    {NAV_ITEMS.map((item, i) => {
                                        const Icon = item.icon;
                                        const isActive = i === activeNav;
                                        return (
                                            <div
                                                key={item.key}
                                                onClick={(e) => { e.stopPropagation(); setActiveNav(i); }}
                                                className={`h-6 rounded flex items-center px-2 gap-1.5 transition-colors cursor-pointer ${isActive
                                                    ? "bg-[#FF5722]/10 text-[#FF5722] font-semibold"
                                                    : "text-[#A3A3A3] hover:bg-white/5"
                                                    }`}
                                            >
                                                <Icon size={10} strokeWidth={isActive ? 2.5 : 1.5} />
                                                {item.label}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Main Content — Dynamic page */}
                            <div className="flex-1 p-2 md:p-4 bg-gradient-to-br from-[#1A1A1A] to-[#111111] overflow-y-auto overflow-x-hidden flex flex-col">
                                <ActivePage />
                            </div>
                        </div>

                        {/* Mobile Bottom Nav — visible only on phone mockup */}
                        <div className="flex md:hidden border-t border-[#333333] bg-[#111111] shrink-0">
                            {NAV_ITEMS.map((item, i) => {
                                const Icon = item.icon;
                                const isActive = i === activeNav;
                                return (
                                    <div
                                        key={item.key}
                                        onClick={(e) => { e.stopPropagation(); setActiveNav(i); }}
                                        className={`flex-1 flex flex-col items-center justify-center py-1.5 cursor-pointer transition-colors ${isActive ? "text-[#FF5722]" : "text-[#666]"}`}
                                    >
                                        <Icon size={10} strokeWidth={isActive ? 2.5 : 1.5} />
                                        <span className="text-[5px] mt-0.5 leading-tight">{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
