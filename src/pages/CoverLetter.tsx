import React, { useState } from 'react';
import { Download, Sparkles, Save, Eye, FileText, User, Building } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { generatePDF } from '../utils/pdfGenerator';

const CoverLetter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [coverLetterData, setCoverLetterData] = useState({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      address: '123 Main St, San Francisco, CA 94102'
    },
    recipientInfo: {
      hiringManager: 'Hiring Manager',
      company: 'Tech Corp',
      address: '456 Business Ave, San Francisco, CA 94103'
    },
    jobDetails: {
      position: 'Software Engineer',
      referenceNumber: '',
      source: 'LinkedIn'
    },
    content: {
      opening: 'I am writing to express my strong interest in the Software Engineer position at Tech Corp. With my extensive background in full-stack development and passion for innovative technology solutions, I am excited about the opportunity to contribute to your team.',
      body: 'In my previous role as a Senior Software Engineer, I successfully led the development of microservices architecture serving over 1 million users, implemented CI/CD pipelines that reduced deployment time by 60%, and mentored junior developers. My expertise in JavaScript, React, Node.js, and cloud technologies aligns perfectly with your requirements.\n\nI am particularly drawn to Tech Corp\'s commitment to innovation and your recent expansion into AI-driven solutions. I believe my experience in machine learning integration and scalable system design would be valuable assets to your engineering team.',
      closing: 'I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to Tech Corp\'s continued success. Thank you for considering my application. I look forward to hearing from you soon.'
    },
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Handle PDF download after payment
  useEffect(() => {
    const shouldDownload = location.state?.download;
    if (shouldDownload) {
      // Clear the navigation state
      window.history.replaceState({}, document.title);
      
      // Trigger single PDF download
      const downloadPDF = async () => {
        try {
          await generatePDF('cover-letter-preview', `${coverLetterData.personalInfo.name.replace(/\s+/g, '_')}_Cover_Letter.pdf`);
        } catch (error) {
          console.error('Error downloading PDF:', error);
          alert('Error downloading PDF. Please try again.');
        }
      };
      
      // Single download execution
      downloadPDF();
    }
  }, [location.state, coverLetterData.personalInfo.name]);

  const generateAICoverLetter = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setCoverLetterData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          opening: `I am excited to apply for the ${prev.jobDetails.position} position at ${prev.recipientInfo.company}. With my proven track record in technology and passion for innovation, I am confident I would be a valuable addition to your team.`,
          body: `Throughout my career, I have developed expertise in cutting-edge technologies and delivered impactful solutions that drive business growth. My experience includes leading cross-functional teams, implementing scalable architectures, and optimizing performance for high-traffic applications.\n\nWhat particularly attracts me to ${prev.recipientInfo.company} is your reputation for fostering innovation and your commitment to excellence. I am eager to bring my technical skills, leadership experience, and collaborative approach to help achieve your organizational goals.`,
          closing: `I would be thrilled to discuss how my background and enthusiasm align with ${prev.recipientInfo.company}'s vision. Thank you for your time and consideration. I look forward to the opportunity to speak with you further.`
        }
      }));
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownloadClick = () => {
    // Store the source for billing page
    sessionStorage.setItem('downloadSource', 'cover-letter');
    navigate('/billing');
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setCoverLetterData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateRecipientInfo = (field: string, value: string) => {
    setCoverLetterData(prev => ({
      ...prev,
      recipientInfo: { ...prev.recipientInfo, [field]: value }
    }));
  };

  const updateJobDetails = (field: string, value: string) => {
    setCoverLetterData(prev => ({
      ...prev,
      jobDetails: { ...prev.jobDetails, [field]: value }
    }));
  };

  const updateContent = (field: string, value: string) => {
    setCoverLetterData(prev => ({
      ...prev,
      content: { ...prev.content, [field]: value }
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cover Letter Builder</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={generateAICoverLetter}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate AI Cover Letter'}</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>
          <button
            onClick={handleDownloadClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={coverLetterData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={coverLetterData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={coverLetterData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={coverLetterData.personalInfo.address}
                  onChange={(e) => updatePersonalInfo('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Building className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Recipient Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label>
                <input
                  type="text"
                  value={coverLetterData.recipientInfo.hiringManager}
                  onChange={(e) => updateRecipientInfo('hiringManager', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={coverLetterData.recipientInfo.company}
                  onChange={(e) => updateRecipientInfo('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                <input
                  type="text"
                  value={coverLetterData.recipientInfo.address}
                  onChange={(e) => updateRecipientInfo('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={coverLetterData.jobDetails.position}
                  onChange={(e) => updateJobDetails('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
                <input
                  type="text"
                  value={coverLetterData.jobDetails.referenceNumber}
                  onChange={(e) => updateJobDetails('referenceNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Cover Letter Content */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Cover Letter Content</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opening Paragraph</label>
                <textarea
                  value={coverLetterData.content.opening}
                  onChange={(e) => updateContent('opening', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body Paragraphs</label>
                <textarea
                  value={coverLetterData.content.body}
                  onChange={(e) => updateContent('body', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Closing Paragraph</label>
                <textarea
                  value={coverLetterData.content.closing}
                  onChange={(e) => updateContent('closing', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
                <Eye className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div className="p-6 overflow-auto max-h-screen">
              <div id="cover-letter-preview" className="bg-white max-w-2xl mx-auto p-8" style={{ minHeight: '11in', width: '8.5in' }}>
                {/* Cover Letter Preview */}
                <div className="mb-8">
                  <div className="text-right mb-8">
                    <p className="text-gray-600">{coverLetterData.date}</p>
                  </div>
                  
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{coverLetterData.personalInfo.name}</h1>
                    <p className="text-gray-600">{coverLetterData.personalInfo.address}</p>
                    <p className="text-gray-600">{coverLetterData.personalInfo.email}</p>
                    <p className="text-gray-600">{coverLetterData.personalInfo.phone}</p>
                  </div>

                  <div className="mb-8">
                    <p className="text-gray-900 font-medium">{coverLetterData.recipientInfo.hiringManager}</p>
                    <p className="text-gray-900 font-medium">{coverLetterData.recipientInfo.company}</p>
                    <p className="text-gray-600">{coverLetterData.recipientInfo.address}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-900">
                      <strong>Re: Application for {coverLetterData.jobDetails.position}</strong>
                      {coverLetterData.jobDetails.referenceNumber && (
                        <span> - Reference: {coverLetterData.jobDetails.referenceNumber}</span>
                      )}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-900">Dear {coverLetterData.recipientInfo.hiringManager},</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <p className="text-gray-800 leading-relaxed">{coverLetterData.content.opening}</p>
                    {coverLetterData.content.body.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-800 leading-relaxed">{paragraph}</p>
                    ))}
                    <p className="text-gray-800 leading-relaxed">{coverLetterData.content.closing}</p>
                  </div>

                  <div>
                    <p className="text-gray-900">Sincerely,</p>
                    <p className="text-gray-900 font-medium mt-4">{coverLetterData.personalInfo.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;