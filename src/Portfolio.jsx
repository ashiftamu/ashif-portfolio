// Portfolio with animated sections, interactive research cards, and continuous background animation + floating scroll effects
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Section({ title, children, delay = 0 }) {
  return (
    <motion.section
      className="max-w-4xl mx-auto px-6 py-16 relative z-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <motion.h2
          className="text-3xl font-bold text-indigo-700 relative inline-block"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="z-10 relative">{title}</span>
        </motion.h2>
        <motion.div
          className="w-32 h-1 mx-auto mt-2 bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-400 rounded-full shadow-md"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
      {children}
    </motion.section>
  );
}

function ResearchCard({ title, subtitle, summary }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={() => setOpen(!open)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-indigo-700 mb-1">{title}</h3>
        {subtitle && <p className="text-sm italic text-gray-600 mb-2">{subtitle}</p>}
        <AnimatePresence>
          {open && (
            <motion.p
              className="text-gray-700 whitespace-pre-line"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {summary}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function BackgroundAnimation() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-br from-white via-indigo-50 to-white animate-gradient-x opacity-40"></div>
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 30s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans relative">
      <BackgroundAnimation />

      <div className="text-center pt-12 px-4">
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          S M Ashif Hossain
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Human Factors Engineer & Ph.D. Student, Texas A&M University
        </motion.p>
      </div>

      <Section title="About Me">
        <p className="text-gray-700 leading-relaxed">
          I am a Ph.D. student in Industrial Engineering at Texas A&M University, working in the Human Factors and Cognitive Systems (HF&CS) lab. My research focuses on haptic feedback design for teleoperation systems in high-risk construction environments. I explore how tactile cues can enhance situational awareness, reduce cognitive workload, and improve safety outcomes in complex, time-delayed tasks.
        </p>
      </Section>

      <Section title="Education">
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Ph.D. in Industrial Engineering, Texas A&M University (2023–Present)</li>
          <li>M.S. in Industrial Engineering, Texas A&M University (2022–2024)</li>
          <li>B.Sc. in Industrial & Production Engineering, BUET</li>
        </ul>
      </Section>

      <Section title="Research Portfolio">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ResearchCard
            title="UX Research for Technology Adoption"
            subtitle="Exploring Excavator Operators' Experiences and Readiness for Advanced Technology Integration"
            summary={`Conducted a comprehensive mixed-methods survey study, utilizing both quantitative and qualitative approaches to capture excavator operators' existing workflows, pain points, and openness to adopting new technologies. This study led to a published paper at 67th HFES Annual Meeting, contributing to the broader understanding of operator needs in technology adaptation within teleoperation tasks.

Developed and led a Contextual Inquiry within operators' real-world environments, enabling observation and analysis of authentic user interactions. This approach provided actionable insights into the functional and ergonomic needs of operators and allowed for the identification of opportunities to enhance the user experience.

Impact: Synthesized findings from both studies revealed critical challenges, user preferences, and specific design recommendations to improve haptic feedback systems in teleoperation tasks. These insights informed a user-centered design strategy, leading to prototype adjustments that significantly improved perceived usability and acceptance among operators.`}
          />
          <ResearchCard
            title="Usability Testing for Haptic Displays"
            subtitle="Assessing the Effectiveness and Usability of Vibrotactile Feedback Systems for Excavator Operators"
            summary={`Conducted formative usability testing to evaluate the ease of interpreting vibrotactile feedback during simulated hazard sensing tasks, focusing on user satisfaction and performance.

Implemented heuristic evaluations to identify usability issues related to feedback clarity and system responsiveness before conducting user testing.

Utilized A/B testing to compare different vibrotactile feedback conditions, analyzing user preferences and performance metrics to determine the most effective feedback design.

Carried out cognitive walkthroughs with participants to assess the intuitiveness of the feedback system, gathering detailed insights on user expectations and interaction challenges.

The research culminated in actionable insights for refining the usability of haptic displays, emphasizing improvements in feedback interpretation, operational efficiency, and overall user experience.

Impact: The findings informed iterative design improvements, creating a more user-centered vibrotactile hazard sensing system that enhances operator response times and reduces potential for error in teleoperation. The results from this research have been submitted for publication.`}
          />
          <ResearchCard
            title="Usability of Haptics in Virtual Reality"
            subtitle="Planned and Scenario-Based Usability Testing"
            summary={`Planned Formative Usability Testing:

Approach: Preparing to conduct usability testing to evaluate the intuitiveness, effectiveness, and user experience of vibro-electrotactile feedback under simulated hazard scenarios in VR.

Outcome: Insights will guide iterative refinements to the feedback system, prioritizing user-centric design improvements.

Scenario-Based Usability Testing:

Approach: Develop immersive VR scenarios replicating real-world excavation tasks to test how effectively users can respond to hazards with varying feedback modalities.

Outcome: Gather qualitative and quantitative data on user interactions, focusing on ease of interpretation, situational awareness, and task performance.`}
          />
        </div>
      </Section>

      <Section title="Certifications & Training">
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Human Subjects Research Certification (CITI Program)</li>
          <li>Construction Safety Orientation (OSHA)</li>
          <li>VR Environment Development with Unity (Self-paced)</li>
          <li>Statistical Modeling in R (Texas A&M University)</li>
        </ul>
      </Section>

      <Section title="Publications">
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Hossain, S. M. A., et al. (2024). Usability of Vibrotactile Feedback in Simulated Excavation Tasks. HFES ASPIRE.</li>
          <li>Bergman, M., Hossain, S. M. A., et al. (2024). Contextual Inquiry in Construction Teleoperation. Manuscript in preparation.</li>
        </ul>
      </Section>

      <Section title="Other Interests">
        <p className="text-gray-700 leading-relaxed">
          Outside research, I enjoy exploring user-centered design challenges in emerging tech, mentoring students in usability studies, and developing immersive VR scenes. I also have a passion for graphic design and minimalist digital aesthetics.
        </p>
      </Section>

      <footer className="text-center text-gray-500 text-sm py-8">
        &copy; {new Date().getFullYear()} S M Ashif Hossain. All rights reserved.
      </footer>
    </main>
  );
}
