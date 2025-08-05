import React, { useState } from 'react';
import { Download, Sparkles, Save, Eye, Palette } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ResumeEditor from '../components/ResumeEditor';
import ResumePreview from '../components/ResumePreview';
import { generatePDF } from '../utils/pdfGenerator';

const Builder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'John Doe',
      title: 'Software Engineer',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      website: 'johndoe.dev'
    },
    summary: 'Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about creating scalable solutions and leading high-performing teams.',
    experience: [
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        startDate: '2021',
        endDate: 'Present',
        description: 'Led development of microservices architecture serving 1M+ users. Mentored junior developers and implemented CI/CD pipelines.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of California',
        location: 'Berkeley, CA',
        year: '2019'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    projects: [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce platform using React, Node.js, and PostgreSQL.',
        technologies: ['React', 'Node.js', 'PostgreSQL']
      }
    ]
  });

  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Handle PDF download after payment
  useEffect(() => {
    const shouldDownload = location.state?.download;
    if (shouldDownload) {
      // Clear the navigation state
      window.history.replaceState({}, document.title);
      
      // Trigger single PDF download
      const downloadPDF = async () => {
        try {
          await generatePDF('resume-preview', `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
        } catch (error) {
          console.error('Error downloading PDF:', error);
          alert('Error downloading PDF. Please try again.');
        }
      };
      
      // Single download execution
      downloadPDF();
    }
  }, [location.state, resumeData.personalInfo.name]);

  const generateAISummary = async () => {
    setIsGeneratingSummary(true);
    // Simulate AI generation
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        summary: `Innovative ${prev.personalInfo.title.toLowerCase()} with proven expertise in ${prev.skills.slice(0, 3).join(', ')}. Demonstrated ability to deliver high-quality solutions and drive technical excellence across multiple projects.`
      }));
      setIsGeneratingSummary(false);
    }, 2000);
  };

  const handleDownloadClick = () => {
    // Store the source for billing page
    sessionStorage.setItem('downloadSource', 'resume');
    navigate('/billing');
  };

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean sidebar design with blue accents' },
    { id: 'corporate', name: 'Corporate', description: 'Traditional professional layout' },
    { id: 'creative', name: 'Creative', description: 'Colorful gradient design for creatives' },
    { id: 'tech', name: 'Tech', description: 'Dark theme with terminal-style elements' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Resume Builder</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={generateAISummary}
            disabled={isGeneratingSummary}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isGeneratingSummary ? 'Generating...' : 'Generate AI Summary'}</span>
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

        {/* Template Selector */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Choose Template</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedTemplate === template.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ResumeEditor 
            resumeData={resumeData} 
            setResumeData={setResumeData}
          />
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Live Preview - {templates.find(t => t.id === selectedTemplate)?.name}</h2>
                <Eye className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div className="p-6 overflow-auto max-h-screen">
              <ResumePreview resumeData={resumeData} template={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;