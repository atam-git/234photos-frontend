'use client'

import { X, Download, FileText, AlertCircle, RefreshCw } from 'lucide-react'
import type { Transaction } from '@/types'

interface TransactionDetailsModalProps {
  transaction: Partial<Transaction>
  onClose: () => void
  onRetry?: () => void
}

export function TransactionDetailsModal({ transaction, onClose, onRetry }: TransactionDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Transaction Details
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Banner */}
          {transaction.status === 'failed' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-red-900 mb-1"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Transaction Failed
                  </p>
                  <p className="text-[12px] text-red-700"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {transaction.metadata?.failureReason || 'Payment was declined. Please check your payment method and try again.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {transaction.status === 'refunded' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-blue-900 mb-1"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Transaction Refunded
                  </p>
                  <p className="text-[12px] text-blue-700"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {transaction.metadata?.refundReason || 'This transaction has been refunded to your original payment method.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Transaction Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Transaction ID
              </span>
              <span className="text-[13px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {transaction.id}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Type
              </span>
              <span className="text-[13px] font-semibold text-[#111] capitalize"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {transaction.type?.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Date
              </span>
              <span className="text-[13px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {transaction.date}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Status
              </span>
              <span className={`text-[11px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full ${
                transaction.status === 'completed' ? 'bg-green-50 text-green-700' :
                transaction.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                transaction.status === 'failed' ? 'bg-red-50 text-red-700' :
                'bg-blue-50 text-blue-700'
              }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {transaction.status}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Amount
              </span>
              <span className={`text-[15px] font-bold ${
                transaction.type === 'credit_purchase' ? 'text-red-600' :
                transaction.type === 'refund' ? 'text-green-600' :
                'text-[#111]'
              }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {transaction.type === 'credit_purchase' ? `-$${transaction.amount}` :
                 transaction.type === 'refund' ? `+$${transaction.amount}` :
                 `${transaction.amount} credit`}
              </span>
            </div>

            {transaction.credits && (
              <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
                <span className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Credits
                </span>
                <span className="text-[13px] font-semibold text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {transaction.credits} credits
                </span>
              </div>
            )}

            {transaction.asset && (
              <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
                <span className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Asset
                </span>
                <span className="text-[13px] font-semibold text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {transaction.asset}
                </span>
              </div>
            )}

            {transaction.metadata?.paymentMethod && (
              <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
                <span className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Payment Method
                </span>
                <span className="text-[13px] font-semibold text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {transaction.metadata.paymentMethod}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          {transaction.status === 'completed' && transaction.type === 'credit_purchase' && (
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F5F5F5] text-[#111] text-[13.5px] font-semibold rounded-xl hover:bg-[#EBEBEB] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <FileText className="w-4 h-4" />
                Download Invoice
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F5F5F5] text-[#111] text-[13.5px] font-semibold rounded-xl hover:bg-[#EBEBEB] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
            </div>
          )}

          {transaction.status === 'failed' && onRetry && (
            <button
              onClick={onRetry}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-xl hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              <RefreshCw className="w-4 h-4" />
              Retry Payment
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
