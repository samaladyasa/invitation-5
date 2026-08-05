import React from 'react';
import { motion } from 'motion/react';
import data from '../../data.json';

export default function FamilySection() {
  const family = data.family;

  return (
    <section id="family" className="py-20 px-4 bg-family relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-cinzel text-xs tracking-[0.3em] text-[#C09A6B] uppercase font-bold">
            {family.tag}
          </span>
          <h2 className="font-cinzel-dec text-3xl md:text-5xl text-[#4A231A] font-bold tracking-wide mt-2">
            {family.headline}
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C09A6B] to-transparent mx-auto my-4" />
          <p className="font-cormorant text-lg md:text-xl text-[#5C09A6B] italic max-w-xl mx-auto">
            "{family.note}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-paper-embossed border-2 border-[#C09A6B] rounded-3xl p-8 text-center shadow-xl relative"
          >
            <span className="font-cinzel text-xs tracking-widest text-[#C09A6B] font-bold uppercase">
              Groom's Lineage
            </span>
            <h3 className="font-cinzel-dec text-2xl font-bold text-[#4A231A] my-2">
              {family.groomFamily.name}
            </h3>

            <div className="w-16 h-[1px] bg-[#C09A6B] mx-auto my-4" />

            <div className="space-y-3 font-cormorant text-base text-[#5C2C1E]/90">
              <p>
                <strong className="font-cinzel text-xs text-[#4A231A] block uppercase tracking-wider">
                  Grandparents
                </strong>
                {family.groomFamily.grandparents}
              </p>
              <p>
                <strong className="font-cinzel text-xs text-[#4A231A] block uppercase tracking-wider">
                  Parents
                </strong>
                {family.groomFamily.parents}
              </p>
              <p>
                <strong className="font-cinzel text-xs text-[#4A231A] block uppercase tracking-wider">
                  Brother & Sister-in-law
                </strong>
                {family.groomFamily.siblings}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="card-paper-embossed border-2 border-[#C09A6B] rounded-3xl p-8 text-center shadow-xl relative"
          >
            <span className="font-cinzel text-xs tracking-widest text-[#C09A6B] font-bold uppercase">
              Bride's Lineage
            </span>
            <h3 className="font-cinzel-dec text-2xl font-bold text-[#4A231A] my-2">
              {family.brideFamily.name}
            </h3>

            <div className="w-16 h-[1px] bg-[#C09A6B] mx-auto my-4" />

            <div className="space-y-3 font-cormorant text-base text-[#5C2C1E]/90">
              <p>
                <strong className="font-cinzel text-xs text-[#4A231A] block uppercase tracking-wider">
                  Grandparents
                </strong>
                {family.brideFamily.grandparents}
              </p>
              <p>
                <strong className="font-cinzel text-xs text-[#4A231A] block uppercase tracking-wider">
                  Parents
                </strong>
                {family.brideFamily.parents}
              </p>
              <p>
                <strong className="font-cinzel text-xs text-[#4A231A] block uppercase tracking-wider">
                  Sister
                </strong>
                {family.brideFamily.siblings}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
