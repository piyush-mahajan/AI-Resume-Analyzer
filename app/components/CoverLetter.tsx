import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from "./Accordion";
import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CoverLetterProps {
  coverLetter: string;
  jobTitle?: string;
  companyName?: string;
}

const CoverLetter: React.FC<CoverLetterProps> = ({ coverLetter, jobTitle = 'the position', companyName = 'your company' }) => {
  const [copied, setCopied] = useState(false);
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Split the cover letter into paragraphs based on double line breaks
  const paragraphs = coverLetter.split('\n\n').filter(paragraph => paragraph.trim() !== '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="mt-8">
      <Accordion defaultOpen="cover-letter">
        <AccordionItem id="cover-letter">
          <AccordionHeader 
            itemId="cover-letter" 
            className="text-lg font-semibold text-gray-900 hover:bg-gray-50 p-4 rounded-lg"
          >
            <p className="text-2xl font-semibold">Your Generated Cover Letter</p>
          </AccordionHeader>
          <AccordionContent itemId="cover-letter" className="bg-white p-6 rounded-b-lg border border-gray-200">
            {/* Header Section */}
            {/* <div className="mb-8">
              <p className="text-right text-gray-600 mb-6">{today}</p>
              
              <div className="mb-6">
                <p className="text-gray-700">Hiring Manager</p>
                <p className="text-gray-700 font-medium">{companyName}</p>
                <p className="text-gray-600 text-sm mt-1">[Company Address]</p>
                <p className="text-gray-600 text-sm">[City, State, ZIP Code]</p>
              </div>
              
              <p className="text-gray-700 mb-1">Subject: Application for {jobTitle} Position</p>
              
              <p className="text-gray-700 mt-6 mb-2">Dear Hiring Manager,</p>
            </div> */}

            {/* Cover Letter Content */}
            <div className="prose max-w-none text-gray-700 mb-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Closing Section */}
            {/* <div className="mt-8">
              <p className="mb-2">Sincerely,</p>
              <p className="text-gray-700">[Your Name]</p>
              <p className="text-gray-600 text-sm">[Your Contact Information]</p>
            </div> */}

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                This cover letter was generated based on your resume and the job description.
              </p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <FiCheck className="w-4 h-4 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="w-4 h-4" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CoverLetter;
