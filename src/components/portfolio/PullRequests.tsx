import { motion, AnimatePresence } from "framer-motion";
import { GitPullRequest, ExternalLink, GitMerge, GitPullRequestClosed, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient, getGlowColor } from "../../lib/themes";
import type { PullRequest } from "../../types/portfolio";

interface PullRequestsProps {
  pullRequests: PullRequest[];
}

const statusConfig = {
  merged: {
    icon: GitMerge,
    color: "#8B5CF6",
    bgColor: "rgba(139, 92, 246, 0.15)",
    label: "Merged",
  },
  open: {
    icon: GitPullRequest,
    color: "#22C55E",
    bgColor: "rgba(34, 197, 94, 0.15)",
    label: "Open",
  },
  closed: {
    icon: GitPullRequestClosed,
    color: "#EF4444",
    bgColor: "rgba(239, 68, 68, 0.15)",
    label: "Closed",
  },
};

const INITIAL_SHOW_COUNT = 4;

export default function PullRequests({ pullRequests }: PullRequestsProps) {
  const { colors, mode } = useTheme();
  const [showAll, setShowAll] = useState(false);
  const [expandedPR, setExpandedPR] = useState<string | null>(null);

  if (!pullRequests || pullRequests.length === 0) return null;

  const displayedPRs = showAll ? pullRequests : pullRequests.slice(0, INITIAL_SHOW_COUNT);
  const hasMore = pullRequests.length > INITIAL_SHOW_COUNT;

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-5 sm:mb-6 relative overflow-hidden rounded-2xl p-4 sm:p-6 backdrop-blur-xl border"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: getGlowColor(colors, mode) }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div
            className="h-6 sm:h-8 w-1 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${colors.highlight}, ${colors.primary})` }}
          />
          <h2 className="text-base sm:text-lg font-semibold" style={{ color: colors.foreground }}>
            Open Source Contributions
          </h2>
        </div>

        <div className="space-y-3">
          {displayedPRs.map((pr) => {
            const status = statusConfig[pr.status];
            const StatusIcon = status.icon;
            const isExpanded = expandedPR === pr.id;

            return (
              <motion.div
                key={pr.id}
                className="rounded-xl border overflow-hidden transition-all backdrop-blur-md"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={ANIMATION.spring}
                style={{
                  backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)",
                  borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${colors.primary}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
                }}
              >
                <button
                  onClick={() => setExpandedPR(isExpanded ? null : pr.id)}
                  className="w-full p-3 sm:p-4 text-left transition-colors cursor-pointer"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: status.bgColor }}
                    >
                      <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: status.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3
                              className="font-medium text-sm sm:text-base truncate"
                              style={{ color: colors.foreground }}
                            >
                              {pr.title}
                            </h3>
                          </div>
                          <span
                            className="text-xs sm:text-sm"
                            style={{ color: colors.primary }}
                          >
                            {pr.repo}
                          </span>
                        </div>
                        <div className="hidden sm:flex items-start gap-3">
                          <div className="text-right">
                            <span
                              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: status.bgColor,
                                color: status.color,
                              }}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {status.label}
                            </span>
                            <p className="text-xs mt-1" style={{ color: `${colors.foreground}80` }}>{pr.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1 sm:hidden">
                        <span
                          className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: status.bgColor,
                            color: status.color,
                          }}
                        >
                          <StatusIcon className="w-2.5 h-2.5" />
                          {status.label}
                        </span>
                        <span className="text-[10px]" style={{ color: `${colors.foreground}60` }}>
                          {pr.date}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                      style={{ color: `${colors.foreground}66` }}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 border-t"
                        style={{ borderColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                      >
                        <p
                          className="text-xs sm:text-sm pt-2.5 sm:pt-3"
                          style={{ color: `${colors.foreground}b3` }}
                        >
                          {pr.description}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <a
                            href={pr.prUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors"
                            style={{
                              backgroundColor: status.bgColor,
                              color: status.color,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" />
                            View PR
                          </a>
                          <a
                            href={pr.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors"
                            style={{
                              backgroundColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                              color: colors.foreground,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GitPullRequest className="w-3 h-3" />
                            View Repo
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer"
              style={{
                background: mode === "dark" ? `${colors.highlight}15` : `${colors.highlight}10`,
                borderColor: mode === "dark" ? `${colors.highlight}30` : `${colors.highlight}20`,
                color: mode === "dark" ? colors.highlight : colors.primary,
              }}
            >
              {showAll ? (
                <>
                  Show less
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  Show {pullRequests.length - INITIAL_SHOW_COUNT} more
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
