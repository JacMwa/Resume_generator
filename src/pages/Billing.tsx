import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building, DollarSign, Check, Star, Download, Shield, Clock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
// Removed duplicate handlePayment function that referenced undefined variables.

const Billing: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [selectedPayment, setSelectedPayment] = useState('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    mpesaPhone: '',
    bankAccount: '',
    bankName: '',
    paypalEmail: ''
  });

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 5.99,
      features: [
        '5 PDF Downloads',
        'Basic Templates',
        'Resume Builder',
        'Cover Letter Builder',
        'Email Support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 10.99,
      popular: true,
      features: [
        '10 PDF Downloads',
        'Premium Templates',
        'AI-Powered Summaries',
        'Resume & Cover Letter Builder',
        'Certifications Section',
        'Priority Support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 25.99,
      features: [
        '40 PDF Downloads',
        'All Premium Templates',
        'AI-Powered Content',
        'Custom Branding',
        'Team Collaboration',
        'Advanced Features',
        'Dedicated Support'
      ]
    }
  ];

  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'Mobile money payment'
    }
  ];

  const handlePayment = async () => {
    const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
    
    if (selectedPayment === 'mpesa') {
      if (!paymentForm.mpesaPhone) {
        alert('Please enter your M-Pesa phone number');
        return;
      }
    }

    setIsProcessing(true);
    
    try {
      // Save billing information to Supabase
      const billingData = {
        plan_id: selectedPlan,
        payment_method: selectedPayment,
        amount: selectedPlanData?.price || 0,
        status: 'completed',
        card_name: paymentForm.cardName || '',
        mpesa_phone: paymentForm.mpesaPhone || '',
        paypal_email: paymentForm.paypalEmail || '',
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('billing')
        .insert([billingData]);

      if (error) {
        console.error('Error saving billing data:', error);
        alert('Payment processing failed. Please try again.');
        setIsProcessing(false);
        return;
      }

      // Simulate payment processing delay
      setIsProcessing(false);
      setPaymentCompleted(true);
      
      // Redirect to download after success message
      setTimeout(() => {
        const source = sessionStorage.getItem('downloadSource') || 'resume';
        if (source === 'cover-letter') {
          navigate('/cover-letter', { state: { download: true } });
        } else {
          navigate('/builder', { state: { download: true } });
        }
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const updatePaymentForm = (field: string, value: string) => {
    setPaymentForm(prev => ({ ...prev, [field]: value }));
  };

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock premium features and create professional resumes that get you hired
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                selectedPlan === plan.id
                  ? 'border-blue-600 shadow-xl scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ${plan.price}
                    <span className="text-lg text-gray-500 font-normal">/month</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <h2 className="text-2xl font-bold mb-2">Complete Your Purchase</h2>
              <p className="text-blue-100">
                You've selected the <strong>{selectedPlanData?.name}</strong> plan for <strong>${selectedPlanData?.price}</strong>
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Payment Methods */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose Payment Method</h3>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedPayment === method.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <button
                          onClick={() => setSelectedPayment(method.id)}
                          className="w-full flex items-center space-x-4 text-left"
                        >
                          <div className={`p-2 rounded-lg ${
                            selectedPayment === method.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {method.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{method.name}</h4>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </button>

                        {/* Payment Form Fields */}
                        {selectedPayment === method.id && (
                          <div className="mt-4 space-y-3 border-t pt-4">

                            {method.id === 'mpesa' && (
                              <>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Your M-Pesa Phone Number</label>
                                  <input
                                    type="tel"
                                    placeholder="+254700000000"
                                    value={paymentForm.mpesaPhone}
                                    onChange={(e) => updatePaymentForm('mpesaPhone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                  <p className="text-sm text-blue-800">
                                    <strong>Payment Instructions:</strong><br/>
                                    1. Send <strong>${selectedPlanData?.price}</strong> to <strong>+254741437924</strong><br/>
                                    2. Use your phone number as reference<br/>
                                    3. Click "Complete Payment" after sending
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                  
                  {paymentCompleted ? (
                    // Payment Success State
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="text-center mb-6">
                        <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h4 className="text-xl font-bold text-green-800 mb-2">Payment Successful!</h4>
                        <p className="text-green-700">
                          Thank you for your purchase. You now have access to premium features.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">{selectedPlanData?.name} Plan</span>
                          <span className="font-semibold">${selectedPlanData?.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>Payment Method</span>
                          <span className="capitalize">M-Pesa</span>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800 text-center mb-2">
                          <strong>Payment Confirmed!</strong>
                        </p>
                        <p className="text-blue-700 text-center text-sm">
                          Redirecting to download your PDF in 2 seconds...
                        </p>
                      </div>
                      
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => navigate('/builder')}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Create Another Resume
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Payment Form State
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">{selectedPlanData?.name} Plan</span>
                          <span className="font-semibold">${selectedPlanData?.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Tax</span>
                          <span className="font-semibold">$0.00</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <span className="text-lg font-bold text-blue-600">${selectedPlanData?.price}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span>Secure payment processing</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span>Instant access after payment</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Download className="h-4 w-4 text-purple-500" />
                          <span>PDF downloads included</span>
                        </div>
                      </div>

                      <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Smartphone className="h-5 w-5" />
                            <span>Complete Payment</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">What You Get</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Instant Download</h4>
              <p className="text-gray-600">Get immediate access to all premium features and templates</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h4>
              <p className="text-gray-600">Your payment information is protected with bank-level security</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h4>
              <p className="text-gray-600">Professional templates designed by industry experts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
